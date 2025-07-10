import { DotNestedKeys, DotNestedKeysTypes } from "@/types";

export type ElementType =
  | "rect"
  | "ellipse"
  | "line"
  | "image"
  | "text"
  |"qr"
  | "frame";

interface Stroke {
  width: number;
  color: string;
  type: Property.BorderTopStyle;
}

interface BaseStyle {
  style: {
    fill: string;
    // single or unified stroke; multi-side strokes can be handled later
    stroke: Stroke;
    opacity: number;
  };
}
export interface BaseElement extends BaseStyle {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  rotation: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface Radius {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export interface RectElement extends BaseElement, Size {
  type: "rect";
  radius: Radius | number;
}
export interface QrElement extends BaseElement, Size {
  type: "qr";
}

interface FrameSize extends Size {
  width: number | "fit-content";
  height: number | "fit-content";
}
export interface FlexStyles extends BaseStyle {
  direction: "row" | "row-reverse" | "column" | "column-reverse";
  items: "start" | "end" | "center";
  justify: "start" | "end" | "center" | "between";
}

export interface FrameElementBase extends BaseElement, FrameSize {
  type: "frame";
  children?: Element[];
  displayType: "flex" | "free";
  gap: number;
  clipContent: boolean;
}
export interface FrameElementFlex extends FrameElementBase, FlexStyles {
  displayType: "flex";
}
export interface FrameElementFree extends FrameElementBase {
  displayType: "free";
}
export type FrameElement = FrameElementFlex | FrameElementFree;

export interface ImageElement extends RectElement {
  type: "image";
  src: string;
}

export interface EllipseElement extends BaseElement, Size {
  type: "ellipse";
}

export interface LineElement extends BaseElement {
  type: "line";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface TextElement extends BaseElement {
  type: "text";
  text: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: string;
}

export type Element =
  | RectElement
  | EllipseElement
  | LineElement
  | TextElement
  | ImageElement
  |QrElement
  | FrameElement;

export type CardFace = "front" | "back";
export interface FaceConfig extends Omit<BaseElement, "type">,Size {
  radius: Radius | number;
  clipContent: boolean;
}

export type actionQueriesInsert =
  | `INSERT in ${CardFace}face frame with id:${string}` // always supply id
  | `INSERT in ${CardFace}face frame with id:${string} childOf:${string}`

  // Insert any other element (ID auto‐generated), optional parent:
  | `INSERT in ${CardFace}face ${Exclude<ElementType, 'frame'>}`
  | `INSERT in ${CardFace}face ${Exclude<ElementType, 'frame'>} childOf:${string}`;
export type actionQueriesUpdate =
  | `UPDATE ${CardFace}face with ${DotNestedKeys<
      Omit<FaceConfig, "id" | "type">
    >}:${string | number | boolean}`
  | `UPDATE itemof id:${string} with ${string}:${string | number | boolean}`;

export type actionQueriesDelete = `DELETE itemof id:${string}`;

export type actionQueries =  actionQueriesInsert | actionQueriesUpdate | actionQueriesDelete

export type tools = "select" | `add-${ElementType}` | "move";
export interface EditorState {
  elements: {
    front: Element[];
    back: Element[];
  };
  faceConfig: {
    front: FaceConfig;
    back: FaceConfig;
  };

  selectedIds: string[];
  history: {
    past: actionQueries[];
    future: actionQueries[];
    present?: actionQueries;
    isRan?:boolean
  };
  tool: tools;
  currentFace?: CardFace | ["front", "back"];
  activeFace?: CardFace | ["front", "back"];
}

export interface EditorStateActions {
  // actions
  addElement: (el: Element) => void;
  selectElement: (id: string, keyboardKeys:string[]) => void;
  populate: ({
    elements,
    faceConfig,
  }: {
    elements: EditorState["elements"];
    faceConfig: EditorState["faceConfig"];
  }) => void;
  setFaceConfig: (
    config: Partial<FaceConfig> | ((prev: FaceConfig) => Partial<FaceConfig>)
  ) => void;
  updateElement: (id: string, updater: (el: Element) => void) => void;
  setCurrentFace: (face: CardFace, keyboardKeys:string[]) => void;
  setActiveFace: (face: CardFace, keyboardKeys:string[]) => void;
  undo: () => void;
  redo: () => void;
  runHistory: () => void;
  handleQuery:(query:actionQueries, fromHistory?:boolean)=>void,
  setTool: (tool: tools) => void;
  setElements: (els: Element[]) => void;
  unSelectFaces: () => void;
  unSelectElements: () => void;
  removeElement: (id: string) => void;
}
