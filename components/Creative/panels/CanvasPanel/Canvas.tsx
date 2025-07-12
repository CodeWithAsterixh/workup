"use client";

import React, {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  ReactNode,
} from "react";
import interact from "interactjs";
import { GridBackground } from "../../GridBg";
import { useDragSpeed } from "@/hooks/drag-speed";

interface CanvasProps {
  children: ReactNode;
  className?: string;
  /** Minimum zoom scale (e.g., 0.5 = 50%) */
  minZoom?: number;
  /** Maximum zoom scale (e.g., 5 = 500%) */
  maxZoom?: number;
  /** Zoom sensitivity factor (lower = slower) */
  zoomSpeed?: number;
  /** Base size of small grid cell in px */
  baseCellSize?: number;
  /** Base size of major grid cell in px */
  baseMajorCellSize?: number;
}

export default function Canvas({
  children,
  className,
  minZoom = 0.5,
  maxZoom = 5,
  zoomSpeed = 0.0005,
  baseCellSize = 5,
  baseMajorCellSize = 5,
}: CanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const {setDragSpeed} = useDragSpeed()

  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [canvasSize, setCanvasSize] = useState({ width: 1000, height: 1000 });
  const [origin, setOrigin] = useState({ x: 0, y: 0 });

    useEffect(() => {
    setDragSpeed(1 / zoom);
  }, [zoom, setDragSpeed]);
  const clamp = (v: number, min: number, max: number) =>
    Math.min(Math.max(v, min), max);

  // center on load/resize
  const recenter = () => {
    if (!containerRef.current) return;
    const { clientWidth, clientHeight } = containerRef.current;
    setOffset({
      x: (clientWidth - canvasSize.width * zoom) / (2 * zoom),
      y: (clientHeight - canvasSize.height * zoom) / (2 * zoom),
    });
  };
  useEffect(() => {
    recenter();
    window.addEventListener("resize", recenter);
    return () => window.removeEventListener("resize", recenter);
  }, [canvasSize, zoom]);

  // wheel zoom + offset clamp + recenter at minZoom
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      if (!(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - rect.left;
      const relY = e.clientY - rect.top;
      setOrigin({ x: relX, y: relY });
      const newZoom = clamp(
        zoom * (1 - e.deltaY * zoomSpeed),
        minZoom,
        maxZoom
      );
      setZoom(newZoom);
      if (newZoom === minZoom) {
        recenter();

        return;
      }
      const px = relX / zoom - offset.x;
      const py = relY / zoom - offset.y;
      let newOffX = relX / newZoom - px;
      let newOffY = relY / newZoom - py;
      const minX = rect.width / newZoom - canvasSize.width;
      const minY = rect.height / newZoom - canvasSize.height;
      newOffX = clamp(newOffX, minX, 0);
      newOffY = clamp(newOffY, minY, 0);
      setOffset({ x: newOffX, y: newOffY });
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [zoom, offset, canvasSize, minZoom, maxZoom, zoomSpeed]);

  // bounded pan
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const inst = interact(el).draggable({
      inertia: true,
      listeners: {
        move(event) {
          setOffset(({ x, y }) => {
            const nx = x + event.dx / zoom;
            const ny = y + event.dy / zoom;
            const minX = el.clientWidth / zoom - canvasSize.width;
            const minY = el.clientHeight / zoom - canvasSize.height;
            return {
              x: clamp(nx, minX, 0),
              y: clamp(ny, minY, 0),
            };
          });
        },
      },
    });
    return () => inst.unset();
  }, [zoom, canvasSize]);

  // auto-expand children bounds
  const checkBounds = () => {
    const wrap = wrapperRef.current;
    if (!wrap) return;
    const els = Array.from(wrap.children) as HTMLElement[];
    let w = canvasSize.width;
    let h = canvasSize.height;
    let dx = 0;
    let dy = 0;
    const wrapRect = wrap.getBoundingClientRect();
    els.forEach((ch) => {
      const r = ch.getBoundingClientRect();
      const x = (r.left - wrapRect.left) / zoom - offset.x;
      const y = (r.top - wrapRect.top) / zoom - offset.y;
      const cw = r.width / zoom;
      const chh = r.height / zoom;
      if (x + cw > w - 20) w = x + cw + 20;
      if (y + chh > h - 20) h = y + chh + 20;
      if (x < 20) dx = Math.max(dx, 20 - x);
      if (y < 20) dy = Math.max(dy, 20 - y);
    });
    if (w !== canvasSize.width || h !== canvasSize.height) {
      setCanvasSize({ width: w, height: h });
    }
    if (dx || dy) setOffset((o) => ({ x: o.x + dx, y: o.y + dy }));
  };
  const prevZoom = useRef(zoom);
  useLayoutEffect(() => {
    if (zoom <= prevZoom.current) {
      prevZoom.current = zoom;
      return;
    }
    prevZoom.current = zoom;
    checkBounds();
  }, [children, zoom]);

  // dynamic grid sizes
  const cellSize = baseCellSize * zoom;
  const majorCellSize = baseMajorCellSize * zoom;

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
      <GridBackground
        cellSize={cellSize}
        lineColor={["var(--color-neutral-900)", "var(--color-neutral-100)"]}
        majorCellSize={majorCellSize}
        majorLineColor={[
          "var(--color-neutral-900)",
          "var(--color-neutral-100)",
        ]}
        bgColor="transparent"
        
      />
        <div ref={wrapperRef} className="p-auto" style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: canvasSize.width,
          height: canvasSize.height,
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
          transformOrigin: `${origin.x}px ${origin.y}px`,
        }}>
          {children}
        </div>
      
    </div>
  );
}
