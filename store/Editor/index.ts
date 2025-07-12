import { create } from "zustand";
import { produce } from "immer";
import {
  actionQueries,
  CardFace,
  EditorState,
  EditorStateActions,
  Element,
} from "./types";
import { ActionQueryParser } from "./queryParser";

export const useEditorStore = create<EditorState & EditorStateActions>(
  (set, get) => ({
    name:"",
    id:"",
    faceConfig: {
      back: {
        id: "back",
        radius: 0,
        rotation: 0,
        style: {
          fill: "#fff",
          opacity: 1,
          stroke: {
            color: "#000",
            type: "dashed",
            width: 0,
          },
        },
        width:400,
        height:200,
        x: 0,
        y: 0,
        clipContent: true,
      },
      front: {
        id: "front",
        radius: 0,
        rotation: 0,
        style: {
          fill: "#f2f",
          opacity: 1,
          stroke: {
            color: "#020",
            type: "dashed",
            width: 0,
          },
        },
        width:400,
        height:200,
        x: 0,
        y: 0,
        clipContent: false,
      },
    },
    elements: {
      back: [],
      front: [],
    },
    selectedIds: [],
    view: { offsetX: 0, offsetY: 0, scale: 1 },
    history: { past: [], future: [], isRan: false },
    tool: "select",
    currentFace: "front",
    addElement: (el) => {
      const face = get().currentFace;

      if (face) {
        set(
          produce((draft) => {
            const faces = Array.isArray(face) ? face : [face];
            faces.forEach((f) => draft.elements[f].push(el));
          })
        );
      }
    },
    setCurrentFace: (face, keyboardKeys) =>
      set(
        produce((state) => {
          const selectMultiple = keyboardKeys.includes("shift");
          let isSame = face === state.currentFace;
          if (!state.currentFace) {
            state.currentFace = face;
          }
          if (selectMultiple) {
            const arrayedFaces =
              typeof state.currentFace === "string"
                ? [state.currentFace]
                : [...state.currentFace];
            isSame = arrayedFaces.includes(face);
            if (isSame) {
              state.currentFace = arrayedFaces.filter(
                (f: string) => f !== face
              );
              return;
            }

            state.currentFace = [...arrayedFaces, face];
          } else {
            state.selectedIds = [];
            if (isSame) return;
            state.currentFace = face;
          }
        })
      ),
    setActiveFace: (face, keyboardKeys) =>
      set(
        produce((state) => {
          const selectMultiple = keyboardKeys.includes("shift");
          let isSame = face === state.activeFace;
          if (!state.activeFace) {
            state.activeFace = face;
          }
          if (selectMultiple) {
            const arrayedFaces =
              typeof state.activeFace === "string"
                ? [state.activeFace]
                : [...state.activeFace];
            isSame = arrayedFaces.includes(face);
            if (isSame) {
              state.activeFace = arrayedFaces.filter((f: string) => f !== face);
              return;
            }

            state.activeFace = [...arrayedFaces, face];
          } else {
            if (isSame) return;
            state.activeFace = face;
          }
        })
      ),
    setFaceConfig(config) {
      set(
        produce((state) => {
          // normalize to array of face‐keys

          const faces = Array.isArray(state.currentFace)
            ? state.currentFace
            : [state.currentFace];

          for (const face of faces) {
            const prevCfg = state.faceConfig[face];
            if (!prevCfg) continue; // skip if somehow missing

            // compute the “patch” you want to apply
            const patch =
              typeof config === "function"
                ? config(prevCfg) // callback gets the existing FaceConfig
                : config; // or just merge in this object

            // apply
            state.faceConfig[face] = {
              ...prevCfg,
              ...patch,
            };
          }
        })
      );
    },
    populate({ elements, faceConfig }) {
      set(
        produce<EditorState>((state) => {
          state.elements = elements;
          state.faceConfig = faceConfig;
          state.selectedIds = [];
          state.currentFace = "front"; // reset to default face
        })
      );
    },
    selectElement: (id, keyboardKeys) => {
      const selectMultiple = keyboardKeys.includes("shift");
      set(
        produce<EditorState>((state) => {
          if (selectMultiple) {
            state.selectedIds = [
              ...state.selectedIds.filter((i) => i !== id),
              id,
            ];
          } else {
            state.selectedIds = [id];
            state.currentFace = undefined;
          }
        })
      );
    },
    unSelectFaces: () => {
      set(produce((state) => ({ ...state, currentFace: undefined })));
    },
    unSelectElements: () => {
      set(produce((state) => ({ ...state, selectedIds: [] })));
    },
    updateElement: (id, updater) => {
      const face = get().currentFace;
      set(
        produce<EditorState>((draft) => {
          // recursive helper: walk an array of elements, return true if updated
          function walk(elems: Element[]): boolean {
            for (const el of elems) {
              if (el.id === id) {
                updater(el);
                return true; // stop once we've applied the update
              }
              if (el.type === "frame" && el.children && walk(el.children)) {
                return true; // bubble up if child was updated
              }
            }
            return false;
          }

          // If currentFace is an array, update each one; otherwise just that face
          if (face) {
            if (Array.isArray(face)) {
              face.forEach((f: CardFace) => {
                walk(draft.elements[f]);
              });
            } else {
              walk(draft.elements[face]);
            }
          } else {
            walk(draft.elements["front"]);
            walk(draft.elements["back"]);
          }
        })
      );
    },
    runHistory() {
      if (!get().history.isRan) {
        const parser = new ActionQueryParser();

        set(
          produce<EditorState>((draft) => {
            const history = draft.history.present
              ? [...draft.history.past, draft.history.present]
              : draft.history.past;
            history.map((hist) => {
              parser.execute(hist);
            });
            draft.history.isRan = true;
          })
        );
      }
    },
    handleQuery(query: actionQueries, fromHistory = false) {
      // 1) record history synchronously

      if (!fromHistory) {
        set(
          produce<EditorState>((draft) => {
            if (draft.history.present) {
              draft.history.past.push(draft.history.present);
            }
            draft.history.present = query;
          })
        );
      }

      // 2) now execute the parser (which will call addElement/updateElement etc)
      const parser = new ActionQueryParser();
      parser.execute(query);
    },
    undo: () => {
      console.log(get().history);

      set(
        produce<EditorState>((state) => {
          if (state.history.past && state.history.present) {
            state.history.future.push(state.history.present);
            state.history.present = state.history.past.pop();
          }
        })
      );

      const present = get().history.present;
      if (present) {
        const parser = new ActionQueryParser();
        parser.execute(present);
      }
    },

    redo: () => {
      console.log("Redo");
      set(
        produce<EditorState>((state) => {
          if (state.history.future && state.history.present) {
            state.history.past.push(state.history.present);
            state.history.present = state.history.future.pop();
          }
        })
      );
      const present = get().history.present;
      if (present) {
        const parser = new ActionQueryParser();
        parser.execute(present);
      }
    },

    setTool: (tool) => set({ tool }),
    setElements: (els,manualFace) => {
      const face = manualFace?manualFace:get().currentFace as CardFace;
      set(
        produce<EditorState>((state) => {
          state.elements[face] = els;
        })
      );
    },
    removeElement: (id) => {
      const face = get().currentFace;
      set(
        produce<EditorState>((state) => {
          if (Array.isArray(face)) {
            face.forEach((f) => {
              state.elements[f] = state.elements[f].filter((e) => e.id !== id);
            });
          } else {
            const foundElementFront = state.elements["front"].find(
              (i) => i.id === id
            )
              ? true
              : false;
            const foundElementBack = state.elements["back"].find(
              (i) => i.id === id
            )
              ? true
              : false;
            if (foundElementFront) {
              state.elements["front"] = state.elements["front"].filter(
                (e) => e.id !== id
              );
            }
            if (foundElementBack) {
              state.elements["back"] = state.elements["back"].filter(
                (e) => e.id !== id
              );
            }
          }
          state.selectedIds = state.selectedIds.filter((i) => i !== id);
        })
      );
    },
    setCustom(updater){
      set(
        produce<EditorState>(state=>updater(state))
      )
    }
  })
);
