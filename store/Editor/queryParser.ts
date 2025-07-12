// utils/ActionQueryParser.ts

import { actionQueries, Element, ElementType, CardFace } from "./types";
import { useEditorStore } from "./index";
import getElementForFace from "@/components/Creative/lib/getElementForFace";
import { createAddMethods } from "./elementAdders";
import { flattenToDotNotation } from "@/lib/dot-notation";

/**
 * ParsedAction describes each supported query operation.
 */
type ParsedAction =
  | {
      kind: "insert";
      face: CardFace;
      elementType: ElementType;
      id?: string;
      childOfId?: string;
    }
  | { kind: "update-face"; face: CardFace; propPath: string; rawValue: string }
  | { kind: "update-element"; id: string; propPath: string; rawValue: string }
  | { kind: "delete-element"; id: string }
  | {
      kind: "move-element";
      id: string;
      position: "first" | "last" | "next" | "previous";
    }
  | {
      kind: "move-face";
      face: CardFace;
      position: "first" | "last" | "next" | "previous";
    }
    | {
      kind: "update-others";
      propPath: string;
      rawValue: string
    };

export class ActionQueryParser {
  private insertFrameRe =
    /^INSERT in (front|back)face frame with id:(\S+)(?: childOf:(\S+))?$/;

  // All other types are auto‐id’d by your factory
  private insertAutoRe =
    /^INSERT in (front|back)face (rect|ellipse|line|image|text|qr)(?: childOf:(\S+))?$/;
  private updateFaceRe = /^UPDATE (front|back)face with ([\w.]+):(.+)$/;
  private updateElemRe = /^UPDATE itemof id:(\S+) with ([\w.]+):(.+)$/;
  private updateOthers = /^UPDATE ([\w.]+):(.*)$/;
  private deleteElemRe = /^DELETE itemof id:(\S+)$/;
  
  private moveElemRe = /^MOVE itemof id:(\S+) to (first|last|next|previous)$/i;
  private moveFaceRe = /^MOVE (front|back)face to (first|last|next|previous)$/i;
  private pp = /^\+\+/;
  private pn = /^\+[0-9]+/;
  private mm = /^--/;
  private mn = /^\-\s[0-9]+/;

  public parse(query: string): ParsedAction {
    let m: RegExpExecArray | null;
    // REVERSE operator: negate a prior update
    if (query.toUpperCase().startsWith("REVERSE ")) {
      const sub = query.slice(8);
      const parsed = this.parse(sub);
      if (parsed.kind === "update-element" || parsed.kind === "update-face") {
        // coerce then negate
        const value = this.coerce(parsed.rawValue);
        if (typeof value === "number") {
          parsed.rawValue = (-value).toString();
          return parsed;
        }
      }
      throw new Error("Can only reverse numeric update queries");
    }
    if ((m = this.updateOthers.exec(query))) {
      const [, propPath, rawValue] = m;
      return {
        kind: "update-others",
        propPath,
        rawValue
      };
    }
    if ((m = this.insertAutoRe.exec(query))){
      const [, face, elementType, childOfId] = m;
      return {
        kind: "insert",
        face: face as CardFace,
        elementType: elementType as ElementType,
        childOfId,
      };
    }
    if ((m = this.insertFrameRe.exec(query))) {
      const [, face, elementType, id, childOfId] = m;
      return {
        kind: "insert",
        face: face as CardFace,
        elementType: elementType as ElementType,
        id,
        childOfId,
      };
    }
    if ((m = this.updateFaceRe.exec(query))) {
      const [, face, propPath, rawValue] = m;
      return {
        kind: "update-face",
        face: face as CardFace,
        propPath,
        rawValue: rawValue.trim(),
      };
    }
    if ((m = this.updateElemRe.exec(query))) {
      const [, id, propPath, rawValue] = m;
      return {
        kind: "update-element",
        id,
        propPath,
        rawValue: rawValue.trim(),
      };
    }
    if ((m = this.deleteElemRe.exec(query))) {
      const [, id] = m;
      return { kind: "delete-element", id };
    }
    // move element in its face array
    if ((m = this.moveElemRe.exec(query))) {
      const [, id, position] = m;
      return { kind: "move-element", id, position: position as any };
    }

    // move (set) active face
    if ((m = this.moveFaceRe.exec(query))) {
      const [, face, position] = m;
      return {
        kind: "move-face",
        face: face as CardFace,
        position: position as any,
      };
    }
    console.log(this.updateOthers.exec(query),query)
    throw new Error(`Unrecognized query: "${query}"`);
  }

  private coerce(raw: string): any {
    if (/^\d+$/.test(raw)) return parseInt(raw, 10);
    if (/^\d+\.\d+$/.test(raw)) return parseFloat(raw);
    if (raw === "true" || raw === "false") return raw === "true";
    return raw;
  }

  private applyNested(obj: any, path: string, value: any, prev?: any) {
    const keys = path.split(".");
    let ref = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      if (!ref[k]) ref[k] = {};
      ref = ref[k];
    }
    const objInDotNot = flattenToDotNotation<typeof prev>(prev);

    if (objInDotNot) {
      const itemValue: any = objInDotNot[path];

      if (itemValue !== null || itemValue !== undefined) {
        let v: RegExpExecArray | null;

        if ((v = this.pp.exec(value))) {
          ref[keys[keys.length - 1]] = itemValue + 1;
        } else if ((v = this.mm.exec(value))) {
          ref[keys[keys.length - 1]] = itemValue - 1;
        } else if ((v = this.pn.exec(value))) {
          const [item] = v;
          const itemNum = parseInt(item.split("+").join("").trim());
          ref[keys[keys.length - 1]] = itemValue + itemNum;
        } else if ((v = this.mn.exec(value))) {
          const [item] = v;
          const itemNum = parseInt(item.split("-").join("").trim());
          ref[keys[keys.length - 1]] = itemValue - itemNum;
        } else {
          ref[keys[keys.length - 1]] = value;
        }
      }
    } else {
      ref[keys[keys.length - 1]] = value;
    }
  }

  public async execute(query: actionQueries) {
    const store = useEditorStore.getState();
    const methods = createAddMethods(store.elements);

    // 1) Regex for frames (explicit id, optional childOf)
    const insertFrameRe =
      /^INSERT in (front|back)face frame with id:(\S+)(?: childOf:(\S+))?$/;
    // 2) Regex for all other types (auto‑ID), optional childOf
    const insertAutoRe =
      /^INSERT in (front|back)face (rect|ellipse|line|image|text|qr)(?: childOf:(\S+))?$/;

    let m: RegExpExecArray | null;

    // ── FRAME INSERT ─────────────────────────────────────────────────────────
    if ((m = insertFrameRe.exec(query))) {
      const [_, __, explicitId, childOfId] = m;
      // build the new frame, overriding its id
      const base = methods.addFrame();
      const newFrame: Element = { ...base, id: explicitId };

      if (childOfId) {
        // nested into existing frame
        store.updateElement(childOfId, (el) => {
          if (el.type === "frame" && Array.isArray(el.children)) {
            el.children.push(newFrame);
          }
        });
      } else {
        // root‑level
        store.addElement(newFrame);
      }
      return;
    }

    // ── AUTO‑ID INSERT ────────────────────────────────────────────────────────
    if ((m = insertAutoRe.exec(query))) {
      const [_, __, type, childOfId] = m;
      // pick and await the right factory method
      let newEl: Element;
      switch (type) {
        case "rect":
          newEl = methods.addRect();
          break;
        case "ellipse":
          newEl = methods.addCircle();
          break;
        case "image":
          newEl = await methods.addImage();
          break;
        case "text":
          newEl = methods.addText();
          break;
        case "line":
          newEl = methods.addLine();
          break;
        case "qr":
          newEl = methods.addQRCode();
          break;
        default:
          newEl = methods.addQRCode();
          break;
      }

      if (childOfId) {
        store.updateElement(childOfId, (el) => {
          if (el.type === "frame" && Array.isArray(el.children)) {
            el.children.push(newEl);
          }
        });
      } else {
        store.addElement(newEl);
      }
      return;
    }

    // ── FALLBACK TO UPDATE / DELETE / FACE ───────────────────────────────────
    const parsed = this.parse(query);
    switch (parsed.kind) {
      case "update-element": {
        const value = this.coerce(parsed.rawValue);
        if (
          getElementForFace(parsed.id, "front", store.elements) ||
          getElementForFace(parsed.id, "back", store.elements)
        ) {
          store.updateElement(parsed.id, (el) => {
            const dotNested = flattenToDotNotation<any>(el);
            const hasItem = dotNested[parsed.propPath] !== undefined;

            if (hasItem) {
              this.applyNested(el, parsed.propPath, value, el);
            }
          });
        }
        break;
      }
      case "update-others":{
        const value = this.coerce(parsed.rawValue);
        const store = useEditorStore.getState()
        this.applyNested(store, parsed.propPath, value, store);
        break;
      }
      case "delete-element": {
        if (
          getElementForFace(parsed.id, "front", store.elements) ||
          getElementForFace(parsed.id, "back", store.elements)
        ) {
          store.removeElement(parsed.id);
        }
        break;
      }
      case "update-face": {
        const value = this.coerce(parsed.rawValue);
        store.setFaceConfig((prev) => {
          const patch: any = {};
          this.applyNested(prev, parsed.propPath, value, prev);
          return patch;
        });
        break;
      }
      case "move-element": {
        // determine which face contains the element
        const face: CardFace = getElementForFace(
          parsed.id,
          "front",
          store.elements
        )
          ? "front"
          : "back";
        const arr = Array.from(store.elements[face]);
        const idx = arr.findIndex((el) => el.id === parsed.id);
        if (idx < 0) break;
        const [el] = arr.splice(idx, 1);
        let newIndex: number;
        switch (parsed.position) {
          case "first":
            newIndex = 0;
            break;
          case "last":
            newIndex = arr.length;
            break;
          case "next":
            newIndex = Math.min(idx + 1, arr.length);
            break;
          case "previous":
            newIndex = Math.max(idx - 1, 0);
            break;
        }
        arr.splice(newIndex, 0, el);
        store.setElements(arr, face);
        break;
      }

      case "move-face": {
        const faces: CardFace[] = ["front", "back"];
        const currentIndex = faces.indexOf(parsed.face);
        let target: CardFace;
        switch (parsed.position) {
          case "first":
            target = "front";
            break;
          case "last":
            target = "back";
            break;
          case "next":
            target = faces[(currentIndex + 1) % faces.length];
            break;
          case "previous":
            target = faces[(currentIndex - 1 + faces.length) % faces.length];
            break;
        }
        store.setActiveFace(target, []);
        break;
      }
    }
  }
}
