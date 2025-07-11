"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import interact from "interactjs";
import React, { forwardRef, useCallback, useEffect, useRef } from "react";
import {
  PassThroughElement,
  PassThroughElementProps,
} from "../PassThroughElement";

/**
 * InteractiveElement wraps any element to add drag, resize, and optional snap behavior via interact.js.
 */
export type InteractiveElementProps<As extends React.ElementType> = Omit<
  PassThroughElementProps<As>,
  "onDragEnd" | "onResizeEnd" | "onDrag" | "onResize"
> & {
  onInteractDragEnd?: (position: { x: number; y: number }) => void;
  onInteractDragging?: (position: { x: number; y: number }) => void;
  onInteractResizeEnd?: (size: { w: number; h: number }) => void;
  onInteractResizing?: (size: { w: number; h: number }) => void;
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
      snapGrid = { x: 0, y: 0 },
      snapRange = 15,
      enableDrag = true,
      enableResize = true,
      enableSnap = true,
      onInteractDragEnd,
      onInteractDragging,
      onInteractResizeEnd,
      onInteractResizing,
      ...passProps
    }: InteractiveElementProps<As>,
    forwardedRef: React.Ref<HTMLElement>
  ) => {
    const elementRef = useRef<HTMLElement | null>(null);
    const setRefs = useCallback(
      (node: HTMLElement) => {
        elementRef.current = node;
        if (!forwardedRef) return;
        if (typeof forwardedRef === "function") forwardedRef(node);
        else
          (forwardedRef as React.MutableRefObject<HTMLElement | null>).current =
            node;
      },
      [forwardedRef]
    );

    // Compute modifiers only once per dependencies
    const snapModifier = React.useMemo(() => {
      if (!enableSnap) return [];
      return [
        interact.modifiers.snap({
          targets: [interact.snappers.grid(snapGrid)],
          range: snapRange,
          relativePoints: [{ x: 0, y: 0 }],
        }),
      ];
    }, [enableSnap, snapGrid, snapRange]);

    useEffect(() => {
      const node = elementRef.current;
      if (!node) return;
      const inst = interact(node);

      if (enableDrag) {
        inst.draggable({
          inertia: true,
          modifiers: snapModifier,
          listeners: {
            move: (event) => {
              const target = event.target as HTMLElement;
              const x = parseFloat(target.dataset.x || "0") + event.dx;
              const y = parseFloat(target.dataset.y || "0") + event.dy;
              target.style.transform = `translate(${x}px, ${y}px)`;
              target.dataset.x = x.toString();
              target.dataset.y = y.toString();
              onInteractDragging?.({ x, y });
            },
            end: (event) => {
              const target = event.target as HTMLElement;
              onInteractDragEnd?.({
                x: parseFloat(target.dataset.x || "0"),
                y: parseFloat(target.dataset.y || "0"),
              });
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
            ...(snapModifier.map(() =>
              interact.modifiers.snapSize({
                targets: [interact.snappers.grid(snapGrid)],
                range: snapRange,
              })
            ) as any),
          ],
          listeners: {
            move: (event) => {
              const target = event.target as HTMLElement;
              const x =
                parseFloat(target.dataset.x || "0") + event.deltaRect.left;
              const y =
                parseFloat(target.dataset.y || "0") + event.deltaRect.top;
              const { width, height } = event.rect;
              target.style.width = `${width}px`;
              target.style.height = `${height}px`;
              target.style.transform = `translate(${x}px, ${y}px)`;
              target.dataset.x = x.toString();
              target.dataset.y = y.toString();
              onInteractResizing?.({ w: width, h: height });
            },
            end: (event) => {
              onInteractResizeEnd?.({
                w: event.rect.width,
                h: event.rect.height,
              });
            },
          },
          margin: 2,
        });
      }

      return () => inst.unset();
    }, [
      enableDrag,
      enableResize,
      onInteractDragEnd,
      onInteractDragging,
      onInteractResizeEnd,
      onInteractResizing,
      snapModifier,
    ]);

    return (
      <PassThroughElement
        as={as}
        asChild={asChild}
        ref={setRefs}
        {...(passProps as PassThroughElementProps<As>)}
      >
        {children}
      </PassThroughElement>
    );
  }
);

InteractiveElementInner.displayName = "InteractiveElement";

export const InteractiveElement = InteractiveElementInner as <
  As extends React.ElementType = "div"
>(
  props: InteractiveElementProps<As> & { ref?: React.Ref<HTMLElement> }
) => React.ReactElement | null;
