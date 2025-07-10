"use client";

import { Slot } from "@/types";
import React, { useEffect, useRef } from "react";

interface SimulatorProps extends Slot {
  width: number;
  height: number;
}

export function ViewportSimulator({ children, height, width }: SimulatorProps) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const w = element.clientWidth;
    const h = element.clientHeight;

    element.style.setProperty("--cvw", `${w / 100}px`);
    element.style.setProperty("--cvh", `${h / 100}px`);
  }, [height, width]);

  return (
    <div
      ref={container}
      style={
        {
          width: `${width}px`,
          height: `${height}px`,
          overflow: "auto",
          "--cvw": "1px",
          "--cvh": "1px",
        } as React.CSSProperties
      }
    >
        {children}
    </div>
  );
}
