"use client";

import React, { useRef, useState, useEffect } from "react";
import interact from "interactjs";

export default function Canvas({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  // pan with interact.js
  useEffect(() => {
    if (!containerRef.current) return;
    const inst = interact(containerRef.current).draggable({
      inertia: true,
      listeners: {
        move(event) {
          setOffset(({ x, y }) => ({
            x: x + event.dx / zoom,
            y: y + event.dy / zoom,
          }));
        },
      },
    });
    return () => inst.unset();
  }, [zoom]);

  // wheel‐to‐zoom with native listener (passive: false)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handler = (e: WheelEvent) => {
      // only zoom if Ctrl/Cmd is held
      if (!(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();

      const scaleFactor = 1 - e.deltaY * 0.001;
      const newZoom = Math.min(4, Math.max(0.2, zoom * scaleFactor));

      // keep cursor point fixed
      const rect = el.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / zoom - offset.x;
      const my = (e.clientY - rect.top)  / zoom - offset.y;

      setZoom(newZoom);
      setOffset({
        x: offset.x - mx * (newZoom / zoom - 1),
        y: offset.y - my * (newZoom / zoom - 1),
      });
    };

    el.addEventListener("wheel", handler, { passive: false });
    return () => {
      el.removeEventListener("wheel", handler);
    };
  }, [offset, zoom]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
          width: "100%",
          height: "100%",
          overflow: "hidden",
          position: "relative",
          touchAction: "none",
          cursor: "grab",
        }}
    >
              <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            transformOrigin: "0 0",
            width: 20000,
            height: 20000,
            }}
      >
        {/* grid background */}
        <svg
          width="20000"
          height="20000"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <defs>
            <pattern
              id="smallGrid"
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 30 0 L 0 0 0 30"
                fill="none"
                stroke="#ccc"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="20000" height="20000" fill="url(#smallGrid)" />
        </svg>

          {children}
        </div>
      </div>
      );
}
