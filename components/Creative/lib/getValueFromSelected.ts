/* eslint-disable @typescript-eslint/no-explicit-any */

import { flattenToDotNotation } from "@/lib/dot-notation";
import { EditorState, Element, FaceConfig } from "@/store/Editor/types";
import { DotNestedKeys } from "@/types";
import { deepNestChildrenElement } from "./deepNest";

interface getValueFromSelectedFaceConfig {
  key: DotNestedKeys<FaceConfig>;
  current: EditorState["currentFace"];
  faceConfig: EditorState["faceConfig"];
  options?: {
    returnAnyways?: boolean;
  };
}

export default function getValueFromSelectedFaceConfig({
  current,
  faceConfig,
  key,
  options = {
    returnAnyways: true,
  },
}: getValueFromSelectedFaceConfig) {
  let prev: EditorState["currentFace"] = "front";

  if (current) {
    prev = current;
  }
  try {
    if (Array.isArray(prev)) {
      const toFlatDN1 = flattenToDotNotation<FaceConfig>(faceConfig[prev[0]]);
      let toFlatDN2 = flattenToDotNotation<FaceConfig>(faceConfig[prev[0]]);

      if (prev.length === 2) {
        toFlatDN2 = flattenToDotNotation<FaceConfig>(faceConfig[prev[1]]);
      }

      const same = toFlatDN1[key] === toFlatDN2[key];

      if (!same) {
        if (!options?.returnAnyways) return null;
      }

      return toFlatDN2[key];
    } else {
      const toFlatDN = flattenToDotNotation<FaceConfig>(faceConfig[prev]);

      return toFlatDN[key];
    }
  } catch {
    return
  }
}

interface GetValueOptions {
  returnAnyways?: boolean;
}

interface GetValueParams {
  key: DotNestedKeys<Element>;
  elements: EditorState["elements"];
  selectIds?: EditorState["selectedIds"];
  options?: GetValueOptions;
}

export function getValueFromSelectedElements<T = any>({
  key,
  elements,
  selectIds = [],
  options = {
    returnAnyways: true,
  },
}: GetValueParams): T | null {
  if (selectIds.length === 0) return null;
  function getElements(face: "front" | "back", id: string) {
    return deepNestChildrenElement(elements[face], id);
  }

  const elementsForFront = selectIds
    .map((id) => getElements("front", id))
    .filter((i): i is Element => !!i);
  const elementsForBack = selectIds
    .map((id) => getElements("back", id))
    .filter((i): i is Element => !!i);

  function getFaceElementFromList(
    face: "front" | "back",
    elementsList: Element[]
  ) {
    for (const el of elementsList) {
      const flats = flattenToDotNotation<Element>(el);
      if (flats[key] !== undefined) {
        return flats[key] as T;
      }
    }
    return null;
  }
  const valueF = getFaceElementFromList("front", elementsForFront);
  const valueB = getFaceElementFromList("back", elementsForBack);

  if (valueF !== null && valueB !== null) {
    if (valueF === valueB) {
      return valueF;
    } else {
      return options?.returnAnyways ? valueB : null;
    }
  } else if (valueF !== null) {
    return valueF;
  } else if (valueB !== null) {
    return valueB;
  }
  return null;
}
