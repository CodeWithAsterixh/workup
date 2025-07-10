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
  | { kind: "delete-element"; id: string };

export class ActionQueryParser {
  private insertFrameRe =
    /^INSERT in (front|back)face frame with id:(\S+)(?: childOf:(\S+))?$/;

  // All other types are auto‐id’d by your factory
  private insertAutoRe =
    /^INSERT in (front|back)face (rect|ellipse|line|image|text)(?: childOf:(\S+))?$/;
  private updateFaceRe = /^UPDATE (front|back)face with ([\w.]+):(.+)$/;
  private updateElemRe = /^UPDATE itemof id:(\S+) with ([\w.]+):(.+)$/;
  private deleteElemRe = /^DELETE itemof id:(\S+)$/;
  private pp = /^\+\+/;
  private pn = /^\+[0-9]+/;
  private mm = /^--/;
  private mn = /^\-\s[0-9]+/;

  public parse(query: string): ParsedAction {
    let m: RegExpExecArray | null;
    if ((m = this.insertAutoRe.exec(query))) {
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
        }else {
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
      /^INSERT in (front|back)face (rect|ellipse|line|image|text)(?: childOf:(\S+))?$/;

    let m: RegExpExecArray | null;

    // ── FRAME INSERT ─────────────────────────────────────────────────────────
    if ((m = insertFrameRe.exec(query))) {
      const [_, face, explicitId, childOfId] = m;
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
      const [_, face, type, childOfId] = m;
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
        default:
          newEl = methods.addQRCode(); // or your line handler
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
            const dotNested = flattenToDotNotation<any>(el)
            const hasItem = dotNested[parsed.propPath] !== undefined

            if(hasItem){
              this.applyNested(el, parsed.propPath, value, el);
            }
            
          });
        }
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
    }
  }
}
