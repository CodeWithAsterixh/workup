"use client";
import { useSingleKeyTracker } from "@/hooks/useKeyboardTracker";
import React, { ReactNode } from "react";
import { PassThroughElement } from "../PassThroughElement";

interface KeyboardTrackerProps {
  children: ReactNode;
  /** Prevent default browser behavior? */
  preventDefault?: boolean;
  className?: string;
  onKeyChange?: (keys: string[]) => void;
  onClick?: () => void;
  as?: React.ElementType;
  asChild?: boolean;
  id?:string
}

export default function KeyboardTracker({
  children,
  as,
  asChild,
  onKeyChange,
  ...props
}: KeyboardTrackerProps) {

  const onKC = onKeyChange?onKeyChange:()=>null
  const ref=
    useSingleKeyTracker<HTMLDivElement>(onKC);

    // useEffect(() => {
    // }, [onKC])
    
  return (
    <PassThroughElement
      ref={ref}
      tabIndex={0}
      as={as}
      asChild={asChild}
      {...props}
    >
      {children}
    </PassThroughElement>
  );
}
