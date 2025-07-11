import {
  Element,
  TextElement,
  ImageElement,
  FrameElement,
  LineElement,
} from "@/store/Editor/types";

export async function calculateSize(
  el: Element,
  container: { width: number; height: number }
): Promise<{ width: number; height: number }> {
  // 0) Lines: derive from endpoints
  if (el.type === "line") {
    const ln = el as LineElement;
    const w = Math.abs(ln.x2 - ln.x1);
    const h = Math.abs(ln.y2 - ln.y1);
    return { width: w, height: h };
  }

  // 1) Fixed numbers
  if (typeof el.width === "number" && typeof el.height === "number") {
    return { width: el.width, height: el.height };
  }

  // 2) Fill-container
  if (el.width === "fill-container" && el.height === "fill-container") {
    return { width: container.width, height: container.height };
  }
  if (el.width === "fill-container" && typeof el.height === "number") {
    return { width: container.width, height: el.height };
  }
  if (typeof el.width === "number" && el.height === "fill-container") {
    return { width: el.width, height: container.height };
  }

  // 3) Hug-content
  if (el.width === "hug-content" || el.height === "hug-content") {
    switch (el.type) {
      case "text": {
        const txt = el as TextElement;
        const w = measureTextWidth(txt.text, txt.fontFamily, txt.fontSize);
        const h = txt.fontSize * 1.2;
        return {
          width: el.width === "hug-content" ? w : (txt.width as number),
          height: el.height === "hug-content" ? h : (txt.height as number),
        };
      }

      case "image":
      case "qr": {
        const imgEl = el as ImageElement;
        const img = await loadImage(imgEl.src);
        return {
          width: el.width === "hug-content" ? img.naturalWidth : (imgEl.width as number),
          height: el.height === "hug-content" ? img.naturalHeight : (imgEl.height as number),
        };
      }

      case "frame": {
        const frame = el as FrameElement;
        let maxW = 0, totalH = 0;
        for (const child of frame.children || []) {
          const { width: cw, height: ch } = await calculateSize(child, container);
          maxW = Math.max(maxW, cw);
          totalH += ch + frame.gap;
        }
        if (frame.gap && totalH > 0) totalH -= frame.gap;
        return {
          width: el.width === "hug-content" ? maxW : (frame.width as number),
          height: el.height === "hug-content" ? totalH : (frame.height as number),
        };
      }

      default: // rect/ellipse
        return {
          width: el.width as number,
          height: el.height as number,
        };
    }
  }

  // Fallback
  return { width: container.width, height: container.height };
}

function measureTextWidth(text: string, fontFamily: string, fontSize: number): number {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return 0;
  ctx.font = `${fontSize}px ${fontFamily}`;
  return ctx.measureText(text).width;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}
