import React from "react";

export function CurvedText({
  text,
  radius = 50,
  fontSize = 16,
  fontFamily = "sans-serif",
  fill = "#000",
  ...props
}: {
  text: string;
  radius?: number;
  fontSize?: number;
  fontFamily?: string;
  fill?: string;
}&React.SVGProps<SVGSVGElement>) {
  // Add extra vertical space equal to radius so arc never gets clipped.
  const width = radius * 2 + fontSize * 2;
  const height = radius + fontSize * 2;
  const cx = width / 2;
  const cy = radius + fontSize;

  const pathId = React.useId();

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ overflow: "visible" }}
      {...props}
    >
      <defs>
        <path
          id={pathId}
          d={`
            M ${cx - radius}, ${cy}
            A ${radius},${radius} 0 1,1 ${cx + radius},${cy}
          `}
        />
      </defs>
      <text
        fill={fill}
        fontSize={fontSize}
        fontFamily={fontFamily}
        textAnchor="middle"
      >
        <textPath
          href={`#${pathId}`}
          startOffset="50%"
          method="align"
          spacing="auto"
        >
          {text}
        </textPath>
      </text>
    </svg>
  );
}
