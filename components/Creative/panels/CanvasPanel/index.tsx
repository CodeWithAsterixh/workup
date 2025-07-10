"use client";
import { useEditorStore } from "@/store/Editor";
import { useKeyboard } from "@/store/Keyboard";
import { Slot } from "@/types";
import { useCallback } from "react";
import KeyboardTracker from "../../KeyboardTracker";

type Props = object & Slot;

export default function CanvasPanel({ children }: Props) {
  const { setValues } = useKeyboard();
  const { unSelectFaces, unSelectElements } = useEditorStore();

  const setHandler = useCallback(
    (keys: string[]) => {
      setValues(keys);
    },
    [setValues]
  );

  return (
    <KeyboardTracker
      onKeyChange={setHandler}
      as={"main"}
      onClick={() => {
        unSelectFaces();
        unSelectElements();
      }}
      id={"designCanvas"}
      className="w-full h-full overflow-auto scrollable box-border !outline-none bg-zinc-50 dark:bg-zinc-800 rounded-lg"
    >
      <div className="inline-block min-w-full min-h-full align-top">
        {children}
      </div>
    </KeyboardTracker>
  );
}
