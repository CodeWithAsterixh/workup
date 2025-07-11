import type { LineElement } from "@/store/Editor/types";

export function createDefaultLineElement(
  startX = 0,
  startY = 0,
  endX = 100,
  endY = 0,
  id= ""
): LineElement {
  return {
    id,           // unique identifier
    type: "line",
    x: startX,              // element origin
    y: startY,
    rotation: 0,            // no rotation by default
    x1: 0,                  // relative to (x,y)
    y1: 0,
    x2: endX - startX,
    y2: endY - startY,
    style: {
      fill: "#000000",      // used as stroke color on lines
      stroke: {
        width: 2,
        color: "#000000",
        type: "solid",      // valid CSS border style
      },
      opacity: 1,
    },
  };
}
