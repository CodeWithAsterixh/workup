"use client";

import React, { useEffect, useState, ReactNode } from "react";
import {
  Crosshair,
  Hand,
  HelpCircle,
  Loader2Icon,
  MousePointer2,
  MousePointerBanIcon,
  MousePointerClick,
  Move,
  TextCursor,
  LucideProps,
} from "lucide-react";

interface CustomCursorProps {
  /** ID of the container element whose cursor to override */
  containerId: string;
  /** manual override: map tailwind cursor classes to React nodes */
  cursorOverrides?: Record<string, ReactNode>;
  /** fallback icon if no mapping found */
  fallbackCursor?: ReactNode;
  /** CSS className for the icon */
  iconClassName?: string;
}

type IconComponent = React.ForwardRefExoticComponent<LucideProps & React.RefAttributes<SVGSVGElement>>;

// Map Tailwind cursor-* classes to lucide-react icons
const defaultMapping: Record<string, IconComponent> = {
  "cursor-pointer": MousePointerClick,
  "cursor-move": Move,
  "cursor-crosshair": Crosshair,
  "cursor-text": TextCursor,
  "cursor-wait": Loader2Icon,
  "cursor-help": HelpCircle,
  "cursor-not-allowed": MousePointerBanIcon,
  "cursor-grab": Hand,
  "cursor-grabbing": Hand,
  "cursor-default": MousePointer2,
};

export default function CustomCursor({
  containerId,
  cursorOverrides = {},
  fallbackCursor = null,
  iconClassName,
}: CustomCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [currentCursorClass, setCurrentCursorClass] = useState<string>("cursor-default");

  useEffect(() => {
    const container = document.querySelector(containerId) as HTMLElement | null;
    if (!container) return;

    // hide native cursor
    const originalCursor = container.style.cursor;
    container.style.cursor = "none";

    function handleMouseMove(e: MouseEvent) {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);

      const elem = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement;
      if (!elem) return;
      const classes = Array.from(elem.classList);
      const found = classes.find((c) => c.startsWith("cursor-"));
      setCurrentCursorClass(found || "cursor-default");
    }

    function handleMouseLeave() {
      setVisible(false);
    }

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.style.cursor = originalCursor;
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [containerId]);

  if (!visible) return null;

  // decide which icon to render
  const Icon =
    cursorOverrides[currentCursorClass] ||
    (() => {
      const Comp = defaultMapping[currentCursorClass];
      return Comp ? <Comp className={iconClassName} /> : fallbackCursor || <MousePointer2 className={iconClassName} />;
    })();

  return (
    <span
      style={{
        position: "fixed",
        top: position.y,
        left: position.x,
        pointerEvents: "none",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {Icon}
    </span>
  );
}
