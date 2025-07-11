"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { memo, useCallback, useEffect, useRef, useState, CSSProperties } from "react";
import { useEditorStore } from "@/store/Editor";
import { useKeyboard } from "@/store/Keyboard";
import { CardFace, Element, QrElement, TextElement } from "@/store/Editor/types";
import { getFillUrl, getGradientDef } from "../lib/getColors";
import { InteractiveElement } from "../InteractiveElement";
import handleEdit from "../lib/editor-functions/handleEdit";
import { calculateSize } from "../lib/editor-functions/calculateSize";
import { CurvedText } from "./CurvedText";
import QRCode from "react-qr-code";

interface RendererProps {
  el: Element;
  face: CardFace;
  index: number;
  id: string;
}



const ElementRenderer = memo(function ElementRenderer({ el, face, index, id }: RendererProps) {
  const { selectElement, selectedIds, tool, handleQuery, faceConfig } = useEditorStore();
  const { "values": keyboardKeys } = useKeyboard();
  const [isEditing, setIsEditing] = useState(false);
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const textRef = useRef<HTMLDivElement>(null);

  const isSelected = selectedIds.includes(el.id) && !isEditing;

  // Recompute size
  useEffect(() => {
    const container = { width: faceConfig[face].width as number, height: faceConfig[face].height as number };
    calculateSize(el, container).then(setSize);
  }, [el, face, faceConfig]);

  const commonStyle: CSSProperties = React.useMemo(() => ({
    transform: `translate(${el.x}px, ${el.y}px) rotate(${el.rotation}deg)`,
    opacity: el.style.opacity,
    outline: isSelected ? "2px dashed #00f" : undefined,
    zIndex: index,
  }), [el, index, isSelected]);

  const handleSelect = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (tool === "select") selectElement(el.id, keyboardKeys);
  }, [tool, selectElement, el.id, keyboardKeys]);

  useEffect(() => {
    if(keyboardKeys.includes("delete")){
      handleEdit.handleDeleteElements()
    }
  }, [keyboardKeys])
  

  const updatePosition = useCallback(({ x, y }: { x: number; y: number }) => {
    handleEdit.handleUpdateElement({ param: "x", value: x, singleElement: id });
    handleEdit.handleUpdateElement({ param: "y", value: y, singleElement: id });
  }, [id]);

  const updateSize = useCallback(({ w, h }: { w: number; h: number }) => {
    handleEdit.handleUpdateElement({ param: "width", value: w, singleElement: id });
    handleEdit.handleUpdateElement({ param: "height", value: h, singleElement: id });
    setSize({ width: w, height: h });
  }, [id]);

  // Text editing focus
  useEffect(() => {
    if (isEditing && textRef.current) {
      textRef.current.focus();
      document.getSelection()?.collapseToEnd();
    }
  }, [isEditing]);

  const handleDoubleClick = useCallback(() => setIsEditing(true), []);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    const newText = e.currentTarget.textContent || "";
    handleQuery(`UPDATE itemof id:${el.id} with text:${newText}`);
    if (!newText.trim()) handleQuery(`DELETE itemof id:${el.id}`);
    setIsEditing(false);
    const container = { width: faceConfig[face].width as number, height: faceConfig[face].height as number };
    calculateSize({ ...el, text: newText } as Element, container).then(setSize);
  }, [el, face, faceConfig, handleQuery]);

  const renderElement = () => {
    const gradientId = `grad-${el.id}`;
    const def = getGradientDef(el.style.fill, gradientId);

    switch (el.type) {
      case "rect":
      case "ellipse":
      case "line": {
        const fillUrl = getFillUrl(el.style.fill, gradientId);
        return (
          <svg onClick={handleSelect} width={size.width} height={size.height} style={commonStyle} id={id} viewBox={`0 0 ${size.width} ${size.height}`}>
            {def && <defs>{def}</defs>}
            {el.type === "rect" && (
              <rect width={size.width} height={size.height} rx={(el as any).radius?.top ?? (el as any).radius} ry={(el as any).radius?.left ?? (el as any).radius} fill={fillUrl} stroke={`${(el as any).style.stroke.width}px ${(el as any).style.stroke.type} ${(el as any).style.stroke.color}`} />
            )}
            {el.type === "ellipse" && (
              <ellipse cx={size.width / 2} cy={size.height / 2} rx={size.width / 2} ry={size.height / 2} fill={fillUrl} stroke={`${(el as any).style.stroke.width}px ${(el as any).style.stroke.type} ${(el as any).style.stroke.color}`} />
            )}
            {el.type === "line" && (() => {
              const ln = el as any;
              const dx = ln.x2 - ln.x1, dy = ln.y2 - ln.y1;
              return <line x1={0} y1={0} x2={dx} y2={dy} stroke={fillUrl} strokeWidth={(el as any).style.stroke.width} />;
            })()}
          </svg>
        );
      }

      case "text": {
        const txt = el as TextElement;
        // clamp radius to fit within SVG height
        const rawRadius = (txt as any).radius ?? 0;
        const maxR = size.height / 2;
        const radius = rawRadius > maxR ? maxR : rawRadius;
        const textContent = txt.text;
        const fill = txt.style.fill;

        // Editing mode
        if (isEditing) {
          return (
            <svg preserveAspectRatio="xMidYMid meet" onClick={handleSelect} width={size.width} height={size.height} style={commonStyle} id={id}>
              <foreignObject width="100%" height="100%">
                <div
                  ref={textRef}
                  contentEditable
                  suppressContentEditableWarning
                  onDoubleClick={handleDoubleClick}
                  onBlur={handleBlur}
                  style={{ width: '100%', height: '100%', fontFamily: txt.fontFamily, fontSize: txt.fontSize, fontWeight: txt.fontWeight, color: fill, outline: 'none', background: 'transparent' }}
                >
                  {textContent}
                </div>
              </foreignObject>
            </svg>
          );
        }

        // Display mode: curved only if radius > 0
        if (radius > 0) {
          return (
            <CurvedText text={textContent} fill={fill} fontFamily={txt.fontFamily} fontSize={txt.fontSize} radius={radius} onClick={handleSelect} onDoubleClick={handleDoubleClick} width={size.width} height={size.height} style={commonStyle} id={id}/>
          );
        }

        // Fallback: straight SVG text centered
        return (
          <svg onClick={handleSelect} width={size.width} height={size.height} style={commonStyle} id={id}>
            <text x={size.width / 2} y={size.height / 2} fill={fill} fontFamily={txt.fontFamily} fontSize={txt.fontSize} fontWeight={txt.fontWeight} textAnchor="middle" dominantBaseline="middle">
              {textContent}
            </text>
          </svg>
        );
      }

      case "image": {
        const imgEl = el as any;
        return <img onClick={handleSelect} src={imgEl.src} style={{ width: size.width, height: size.height, objectFit: 'cover', ...commonStyle }} id={id} />;
      }
      case "qr":{
        const qr = el as QrElement;
        return (
          <div onClick={handleSelect} id={id} style={{ width: size.width, height: size.height, background: el.style.fill, overflow:"hidden", ...commonStyle }}>
            <QRCode value={qr.qrOnly.value||""} seed={100} bgColor={el.qrOnly.background} accentHeight={200} className="!size-full" fgColor={el.qrOnly.foreGround} level="H" />
          </div>
        );
      }

      case "frame": {
        const frame = el as any;
        const layout: CSSProperties = frame.displayType === 'flex'
          ? { display: 'flex', flexDirection: frame.direction, gap: frame.gap, alignItems: frame.items, justifyContent: frame.justify }
          : { display: 'block' };
        return (
          <div onClick={handleSelect} id={id} style={{ width: size.width, height: size.height, background: el.style.fill, ...layout, ...commonStyle }}>
            {frame.children?.map((child: Element, i: number) => (
              <ElementRenderer key={child.id} el={child} face={face} index={i} id={child.id} />
            ))}
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <InteractiveElement
      enableSnap={isSelected}
      enableDrag={isSelected}
      enableResize={isSelected}
      onInteractDragEnd={updatePosition}
      onInteractResizeEnd={updateSize}
      asChild
    >
      {renderElement()}
    </InteractiveElement>
  );
});

ElementRenderer.displayName = 'ElementRenderer';
export { ElementRenderer };
