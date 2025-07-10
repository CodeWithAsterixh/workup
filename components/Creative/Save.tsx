"use client";
import { useDebouncedEffect } from "@/hooks/useDebouncedEffects";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/Editor";
import React, { useEffect, useState } from "react";


export default function Save() {
  const { history } = useEditorStore();
  const [saved, setSaved] = useState(false);
  useDebouncedEffect(
    () => {
      if (history.present) {
        setSaved(true);
      }
    },
    [history.present],
    3000
  );
  useEffect(() => {
    if (history.present) {
        setSaved(false);
      }
  }, [history.present]);

  if (saved) return null;
  return (
    <span
      className={cn("size-2 rounded-full pointer-events-none duration-300", {
        "bg-transparent": saved,
        "bg-neutral-500 dark:bg-neutral-200": !saved,
      })}
    />
  );
}
