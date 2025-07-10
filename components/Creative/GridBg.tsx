import React, { CSSProperties, PropsWithChildren } from "react";
import { PassThroughElement } from "../PassThroughElement";
import useTheme from "@/hooks/useTheme";

interface GridBackgroundProps extends PropsWithChildren<object> {
  /** Size of the small grid cells (px) */
  cellSize?: number;
  /** Color of the small grid lines */
  lineColor?: string|[string,string];
  /** Optionally add a heavier grid every N cells */
  majorCellSize?: number;
  /** Color of the major grid lines */
  majorLineColor?: string|[string,string];
  /** Base background color */
  bgColor?: string|[string,string];
  /** Any extra styling to merge */
  style?: CSSProperties;
}

export function GridBackground({
  children,
  cellSize = 20,
  lineColor = "#ccc",
  majorCellSize,
  majorLineColor = "#bbb",
  bgColor = "#fff",
  style,
}: GridBackgroundProps) {
    const {theme} = useTheme()
    
  // build the gradient layers
  const layers: string[] = [
    // small horizontal
    `linear-gradient(to bottom, ${Array.isArray(lineColor)?`${theme==="dark"?lineColor[0]:lineColor[1]}`:lineColor} 1px, transparent 1px)`,
    // small vertical
    `linear-gradient(to right, ${Array.isArray(lineColor)?`${theme==="dark"?lineColor[0]:lineColor[1]}`:lineColor} 1px, transparent 1px)`,
  ];

  const sizes: string[] = [
    `${cellSize}px ${cellSize}px`,
    `${cellSize}px ${cellSize}px`,
  ];

  if (majorCellSize) {
    layers.push(
      // major horizontal
      `linear-gradient(to bottom, ${Array.isArray(majorLineColor)?`${theme==="dark"?majorLineColor[0]:majorLineColor[1]}`:majorLineColor} 1px, transparent 1px)`,
      // major vertical
      `linear-gradient(to right, ${Array.isArray(majorLineColor)?`${theme==="dark"?majorLineColor[0]:majorLineColor[1]}`:majorLineColor} 1px, transparent 1px)`
    );
    sizes.push(
      `${majorCellSize}px ${majorCellSize}px`,
      `${majorCellSize}px ${majorCellSize}px`
    );
  }

  const gridStyle: CSSProperties = {
    position: "relative",
    backgroundColor: Array.isArray(bgColor)?`${theme==="dark"?bgColor[0]:bgColor[1]}`:bgColor,
    backgroundImage: layers.join(", "),
    backgroundSize: sizes.join(", "),
    width: "100%",
    height: "100%",
    overflow: "auto",
    ...style,
  };

  return <PassThroughElement style={gridStyle} asChild>{children}</PassThroughElement>;
}
