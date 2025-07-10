/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEditorStore } from "@/store/Editor";
import type { handleEditFace, handleEditElements as editEle } from "./types";
import { DotNestedKeys } from "@/types";
import { CardFace, Element, FaceConfig } from "@/store/Editor/types";

const handleEditFaces = (handler: handleEditFace) => {
  const { currentFace } = useEditorStore.getState();
  const faces = Array.isArray(currentFace) ? currentFace : [currentFace];
  faces.map((face) => {
    if (face) {
      handler({ face });
    }
  });
};

const handleEditElements = (handler: editEle) => {
  const { selectedIds } = useEditorStore.getState();

  selectedIds.forEach((id) => {
    handler({ id });
  });
};

const handleUpdateFace = ({
  param,
  value,
  singleFace,
}: {
  param: DotNestedKeys<Omit<FaceConfig, "id">>;
  value: any;
  singleFace?: CardFace;
}) => {
  const { handleQuery } = useEditorStore.getState();
  if (singleFace) {
    handleQuery(`UPDATE ${singleFace}face with ${param}:${value}`);
  } else {
    handleEditFaces(({ face }) => {
      handleQuery(`UPDATE ${face}face with ${param}:${value}`);
    });
  }
};
const handleUpdateElement = ({
  param,
  value,
  singleElement,
}: {
  param: DotNestedKeys<Element>;
  value: any;
  singleElement?: string;
}) => {
  const { handleQuery } = useEditorStore.getState();
  if (singleElement) {
    handleQuery(`UPDATE itemof id:${singleElement} with ${param}:${value}`);
  } else {
    handleEditElements(({ id }) => {
      handleQuery(`UPDATE itemof id:${id} with ${param}:${value}`);
    });
  }
};
const handleDeleteElements = () => {
  const { handleQuery } = useEditorStore.getState();

  handleEditElements(({ id }) => {
    handleQuery(`DELETE itemof id:${id}`);
  });
};

const handleEdit = {
  handleUpdateFace,
  handleUpdateElement,
  handleDeleteElements,
};

export default handleEdit;
