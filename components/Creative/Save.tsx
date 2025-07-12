"use client";

import { useDebouncedEffect } from "@/hooks/useDebouncedEffects";
import { loadAll, persistAll } from "@/lib/localStorageDesigns";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/Editor";
import { designCard } from "@/types/designs";
import { useEffect, useState } from "react";

// localStorage key
const STORAGE_KEY = "designCards";

export default function Save({ as }: { as: string }) {
  const {
    history,
    elements,
    faceConfig,
    populate,
    name,
    setCustom,
  } = useEditorStore();
  const [saved, setSaved] = useState(true);

  // Helper to load+parse or return empty array

  useDebouncedEffect(
    () => {
      if (saved) return;
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
        updatedAt: timestamp,
      };

      // Load existing, replace or append
      const all = loadAll(STORAGE_KEY);
      const idx = all.findIndex((c) => c.id === as);
      if (idx >= 0) {
        const theName = name.trim()!==""?name:all[idx].name.trim() !== "" ? all[idx].name : as
        all[idx] = {
          ...newCard,
          name: theName,
        };

        setCustom((s) => {
          s.name = all[idx].name.trim() !== "" ? all[idx].name : as;
        });
      } else {
        setCustom((s) => {
          s.name = newCard.name.trim() !== "" ? newCard.name : as;
        });
        all.push(newCard);
      }
      setCustom((s) => {
        s.id = newCard.id || as;
      });

      persistAll(all, STORAGE_KEY);

      setSaved(true);
    },
    [elements, faceConfig, saved],
    3000
  );

  // Reset saved flag immediately on new changes
  useEffect(() => {
    if (history.present) {
      setSaved(false);
    }
  }, [history.present]);
  useEffect(() => {
    const item = loadAll().find((i) => i.id === as);
    if (item) {
      setCustom((s) => {
        s.id = item.id;
        s.name = item.name;
      });
      populate({
        elements: {
          back: item.config.back.elements,
          front: item.config.front.elements,
        },
        faceConfig: {
          back: item.config.back.faceConfig,
          front: item.config.front.faceConfig,
        },
      });
    } else {
      setSaved(false);
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
