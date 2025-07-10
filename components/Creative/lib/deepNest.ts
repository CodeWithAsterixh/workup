import { Element } from "@/store/Editor/types";

export function deepNestChildrenElement(
  obj: Element | Element[],
  findId: string
): Element | undefined {
  // If it's an array, try each entry until one matches
  if (Array.isArray(obj)) {
    for (const entry of obj) {
      const found = deepNestChildrenElement(entry, findId);
      if (found) return found;
    }
  } else {
    // Base case: did we find it?
    if (obj.id === findId) {
      return obj;
    }
    // Otherwise, if it has children, recurse into them
    if (obj.type==="frame" && obj.children) {
      for (const child of obj.children) {
        const found = deepNestChildrenElement(child, findId);
        if (found) return found;
      }
    }
  }

  // Not here, not in any children
  return undefined;
}
