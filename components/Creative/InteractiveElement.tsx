"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { forwardRef, useEffect, useRef } from "react";
import interact from "interactjs";
import {
  PassThroughElement,
  PassThroughElementProps,
} from "../PassThroughElement";

/**
 * InteractiveElement wraps any element to add drag, resize, and snap behavior via interact.js.
 * Features can be toggled via props: enableDrag, enableResize, enableSnap.
 */
export type InteractiveElementProps<As extends React.ElementType> =
  /** Omit native event props that conflict */
  Omit<PassThroughElementProps<As>, 'onDragEnd' | 'onResizeEnd' | 'onDrag' | 'onResize'> & {
    /** Called when interact.js drag ends */
    onInteractDragEnd?: (val: { x: number; y: number }) => void;
    /** Called when interact.js drag is active */
    onInteractDragging?: (val: { x: number; y: number }) => void;
    /** Called when interact.js resize ends */
    onInteractResizeEnd?: (val: { w: number; h: number }) => void;
    /** Called when interact.js resizing */
    onInteractResizing?: (val: { w: number; h: number }) => void;
    /** Called on each snap move */
    onInteractSnap?: (event: Interact.InteractEvent) => void;
    snapGrid?: { x: number; y: number };
    snapRange?: number;
    enableDrag?: boolean;
    enableResize?: boolean;
    enableSnap?: boolean;
  };

const InteractiveElementInner = forwardRef(
  <As extends React.ElementType = "div">(
    {
      as,
      asChild,
      children,
      onInteractDragEnd,
      onInteractDragging,
      onInteractResizeEnd,
      onInteractResizing,
      onInteractSnap,
      snapGrid = { x: 0, y: 0 },
      snapRange = 15,
      enableDrag = true,
      enableResize = true,
      enableSnap = true,
      ...rest
    }: InteractiveElementProps<As>,
    ref: React.Ref<Element>
  ) => {
    const elRef = useRef<HTMLElement | null>(null);
    const setRef = (el: HTMLElement) => {
      elRef.current = el;
      if (typeof ref === "function") ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = el;
    };

    useEffect(() => {
      const el = elRef.current;
      if (!el) return;

      // ensure dataset coords
      if (!el.dataset.x) el.dataset.x = "0";
      if (!el.dataset.y) el.dataset.y = "0";

      const inst = interact(el);

      if (enableDrag) {
        inst.draggable({
          inertia: true,
          modifiers: enableSnap
            ? [
                interact.modifiers.snap({
                  targets: [interact.snappers.grid(snapGrid)],
                  range: snapRange,
                  relativePoints: [{ x: 0, y: 0 }],
                }),
              ]
            : [],
          listeners: {
            move(event) {
              const target = event.target as HTMLElement;
              const prevX = parseFloat(target.dataset.x!);
              const prevY = parseFloat(target.dataset.y!);
              const newX = prevX + event.dx;
              const newY = prevY + event.dy;
              onInteractDragging?.({ x:newX, y:newY })
              
              target.style.transform = `translate(${newX}px, ${newY}px)`;
              target.dataset.x = newX.toString();
              target.dataset.y = newY.toString();
              if (enableSnap && event.type === "snapmove" && onInteractSnap) {
                onInteractSnap(event as Interact.InteractEvent);
              }
            },
            end(event) {
              if (onInteractDragEnd) {
                const target = event.target as HTMLElement;
                const x = parseFloat(target.dataset.x!);
                const y = parseFloat(target.dataset.y!);
                onInteractDragEnd({ x, y });
              }
            },
          },
        });
      }

      if (enableResize) {
        inst.resizable({
          edges: { top: true, left: true, bottom: true, right: true },
          inertia: true,
          modifiers: [
            interact.modifiers.restrictSize({ min: { width: 20, height: 20 } }),
            enableSnap
              ? interact.modifiers.snapSize({
                  targets: [interact.snappers.grid(snapGrid)],
                  range: snapRange,
                })
              : null,
          ].filter(Boolean) as any,
          listeners: {
            move(event) {
              const target = event.target as HTMLElement;
              const prevX = parseFloat(target.dataset.x!);
              const prevY = parseFloat(target.dataset.y!);
              const { width, height } = event.rect;
              target.style.width = `${width}px`;
              target.style.height = `${height}px`;
              onInteractResizing?.({w:width, h:height});
              const newX = prevX + event.deltaRect.left;
              const newY = prevY + event.deltaRect.top;
              target.style.transform = `translate(${newX}px, ${newY}px)`;
              target.dataset.x = newX.toString();
              target.dataset.y = newY.toString();
            },
            end(event) {
              const { width, height } = event.rect;
              onInteractResizeEnd?.({w:width, h:height});
            },
          },
        });
      }

      return () => inst.unset();
    }, [
      enableDrag,
      enableResize,
      enableSnap,
      onInteractDragEnd,
      onInteractResizeEnd,
      onInteractSnap,
      snapGrid,
      snapRange,
    ]);

    return (
      <PassThroughElement as={as} asChild={asChild} ref={setRef}  {...(rest as any)}>
        {children}
      </PassThroughElement>
    );
  }
);

InteractiveElementInner.displayName = "InteractiveElement";

export const InteractiveElement = InteractiveElementInner as
  <As extends React.ElementType = "div">(
    props: InteractiveElementProps<As> & { ref?: React.Ref<Element> }
  ) => React.ReactElement | null;