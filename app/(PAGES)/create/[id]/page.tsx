"use client";
import Render from "@/components/Creative/Workspace/Render";
import { useEditorStore } from "@/store/Editor";
import { CardFace } from "@/store/Editor/types";
import { useKeyboard } from "@/store/Keyboard";

export default function CreatePage() {
  const { faceConfig, ...state } = useEditorStore();
  const { values: keyboardKeys } = useKeyboard();
  // useEffect(() => {
  //   async function getDesign() {
  //     if (id) {
  //       const design = (await fetch(`/api/v1/designs/${id}`).then((res) =>
  //         res.json()
  //       )) as { data: designCard } & generalResponse;
  //       if (design.data) {
  //         populate({
  //           elements: {
  //             back: design.data.config.back.elements,
  //             front: design.data.config.front.elements,
  //           },
  //           faceConfig: {
  //             back: design.data.config.back.faceConfig,
  //             front: design.data.config.front.faceConfig,
  //           },
  //         });
  //       } else {
  //         const postDesign = (await fetch(`/api/v1/designs/${id}`, {
  //           method: "POST",
  //           body: JSON.stringify({
  //             config: {
  //               back: {
  //                 elements: state.elements.back,
  //                 faceConfig: faceConfig.back,
  //               },
  //               front: {
  //                 elements: state.elements.front,
  //                 faceConfig: faceConfig.front,
  //               },
  //             },
  //             description: "",
  //             name: id,
  //           } as designCard),
  //         }).then((res) => res.json())) as {
  //           data: designCard;
  //         } & generalResponse;
  //       }
  //     }
  //   }

  //   getDesign();
  // }, [id]);

  const handleSetFace = (face: CardFace) => {
    state.setCurrentFace(face, keyboardKeys);
    state.setActiveFace(face, keyboardKeys);
  };
  return (
    <>
      <Render
        currentFace={state.currentFace}
        elements={state.elements}
        face="front"
        faceConfig={faceConfig.front}
        history={state.history}
        selectedIds={state.selectedIds}
        selectFace={handleSetFace}
      />
      <Render
        currentFace={state.currentFace}
        elements={state.elements}
        face="back"
        faceConfig={faceConfig.back}
        history={state.history}
        selectedIds={state.selectedIds}
        selectFace={handleSetFace}
      />
    </>
  );
}
