"use client";

import { useDebouncedEffect } from "@/hooks/useDebouncedEffects";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/Editor";
import { designCard } from "@/types/designs";
import React, { useEffect, useState } from "react";

// localStorage key
const STORAGE_KEY = "designCards";

export default function Save({ as }: { as: string }) {
  const { history, elements, faceConfig, populate } = useEditorStore();
  const [saved, setSaved] = useState(false);

  // Helper to load+parse or return empty array
  const loadAll = (): designCard[] => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch {
      return [];
    }
  };

  // Write back to localStorage
  const persistAll = (cards: designCard[]) =>
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));

  useDebouncedEffect(
    () => {
      if (!history.present) return;
      // Build the new/updated card
      const timestamp = new Date().toISOString();
      const newCard: designCard = {
        id: as,
        name: as,
        description: `Auto‑saved at ${timestamp}`,
        config: {
          front: {
            faceConfig: faceConfig.front,
            elements: elements.front,
          },
          back: {
            faceConfig: faceConfig.back,
            elements: elements.back,
          },
        },
      };

      // Load existing, replace or append
      const all = loadAll();
      const idx = all.findIndex((c) => c.name === as);
      if (idx >= 0) {
        all[idx] = newCard;
      } else {
        all.push(newCard);
      }
      persistAll(all);

      setSaved(true);
    },
    [history.present, elements, faceConfig],
    3000
  );

  // Reset saved flag immediately on new changes
  useEffect(() => {
    if (history.present) {
      setSaved(false);
    }
  }, [history.present]);
   useEffect(() => {
    const item = loadAll().find((i)=>i.id === as)
    if(item){
      populate({
        elements: {
          back: item.config.back.elements,
          front: item.config.front.elements,
        },
        faceConfig: {
          back: item.config.back.faceConfig,
          front: item.config.front.faceConfig,
        }
      })
    }
  }, []);

  // Hide the indicator once `saved === true`
  if (saved) return null;

  return (
    <span
      className={cn("size-2 rounded-full pointer-events-none duration-300", {
        "bg-transparent": saved,
        "bg-neutral-500 dark:bg-neutral-200": !saved,
      })}
      aria-label={`Saving ${as}…`}
    />
  );
}
