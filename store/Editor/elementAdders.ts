import { convertTob64 } from "@/components/Creative/lib/convertTob64";
import { EditorState, EditorStateActions, Element } from "@/store/Editor/types";

/**
 * Factory that returns an object of methods to add each element type.
 */
export function createAddMethods(
  elements: EditorState["elements"],
) {
  const getNextId = (type: string) => {
    const countBack = elements["back"]?.filter((e: any) => e.type === type).length ?? 0;
    const countFront = elements["front"]?.filter((e: any) => e.type === type).length ?? 0;
    return `${type}${countBack + countFront + 1}`;
  };

  return {
    /** No-op select tool */
    select: () => {},

    /** Add a rectangle */
    addRect: (): Element => ({
      type: 'rect',
      id: getNextId('rect'),
      x: 0,
      y: 0,
      rotation: 0,
      width: 100,
      height: 100,
      style: { fill: '#fff', opacity: 1, stroke: { color: '#000', type: 'solid', width: 1 } },
      radius: 0,
    }),

    /** Add a circle */
    addCircle: (): Element => ({
      type: 'ellipse',
      id: getNextId('ellipse'),
      x: 0,
      y: 0,
      rotation: 0,
      width: 100,
      height: 100,
      style: { fill: '#fff', opacity: 1, stroke: { color: '#000', type: 'solid', width: 1 } },
    }),

    /** Add an image via file picker, returns the new Element */
    addImage: async (): Promise<Element> => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.style.display = 'none';
      document.body.appendChild(input);

      const element = await new Promise<Element>((resolve, reject) => {
        input.click();
        input.addEventListener('change', async () => {
          document.body.removeChild(input);
          if (input.files && input.files[0].type.startsWith('image/')) {
            try {
              const src = await convertTob64(input.files[0]) as string;
              resolve({
                type: 'image',
                id: getNextId('image'),
                x: 0,
                y: 0,
                rotation: 0,
                width: 120,
                height: 80,
                style: { fill: '#fff', opacity: 1, stroke: { color: '#000', type: 'solid', width: 1 } },
                radius: 0,
                src,
              });
            } catch (err) {
              reject(err);
            }
          } else {
            reject(new Error('No valid image file selected'));
          }
        }, { once: true });
      });

      return element;
    },

    /** Add a QR code placeholder (text element) */
    addQRCode: (): Element => ({
      type: 'text',
      id: getNextId('text'),
      x: 0,
      y: 0,
      rotation: 0,
      style: { fill: '#000', opacity: 1, stroke: { color: '#000', type: 'solid', width: 1 } },
      text: '',
      fontFamily: 'Arial',
      fontSize: 14,
      fontWeight: '400',
    }),

    /** Add a frame container */
    addFrame: (): Element => ({
      type: 'frame',
      id: getNextId('frame'),
      x: 0,
      y: 0,
      rotation: 0,
      width: 100,
      height: 100,
      style: { fill: '#000', opacity: 1, stroke: { color: '#000', type: 'solid', width: 1 } },
      displayType: 'free',
      gap: 0,
      children: [],
      clipContent: false,
    }),

    /** Add a text element */
    addText: (): Element => ({
      type: 'text',
      id: getNextId('text'),
      x: 0,
      y: 0,
      rotation: 0,
      style: { fill: '#000', opacity: 1, stroke: { color: '#000', type: 'solid', width: 1 } },
      text: 'New text',
      fontFamily: 'Arial, sans-serif',
      fontSize: 14,
      fontWeight: '400',
    }),
  };
}
