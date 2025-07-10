import { Stroke } from "@/store/Editor/types";

export type borderStroke =
  | Stroke
  | [Stroke, Stroke]
  | [Stroke, Stroke, Stroke, Stroke];
export default function getBorderStyle(strokes: borderStroke): string {
  const format = (s: Stroke) => `${s.width}px ${s.type} ${s.color}`;

  if (Array.isArray(strokes)) {
    const len = strokes.length;
    if (len === 2) {
      const [vertical, horizontal] = strokes;
      return [
        format(vertical),
        format(horizontal),
        format(vertical),
        format(horizontal),
      ].join(" ");
    } else if (len === 4) {
      return strokes.map(format).join(" ");
    }
  } else {
    return format(strokes);
  }

  return "";
}
