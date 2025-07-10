import { EditorState, Element } from "@/store/Editor/types";
import { deepNestChildrenElement } from "./deepNest";

export default function getElementForFace(
  id: string,
  face: "front" | "back",
  elements: EditorState["elements"]
): Element | null {
  if (!elements || !elements[face]) return null;

  const element = deepNestChildrenElement(elements[face], id);
  return element || null;
}
