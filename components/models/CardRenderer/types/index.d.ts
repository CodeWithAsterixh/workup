/* eslint-disable @typescript-eslint/no-explicit-any */

import type { CSSProperties } from "react";
import type { QRCodeProps } from "react-qr-code";
import type { Validator } from "~/components/Options";

interface BaseElementConfig {
  /** Nested elements (e.g. shape containing text) */
  children?: ElementConfig[];
  /** Common styling or other props */
  properties?: {
    styles?: CSSProperties;
    [key: string]: any;
  };
  value?: string; // optional value for shape
  id:string
}

// Text & Image (share same requirements)
interface TextImageConfig extends BaseElementConfig {
  type: "text" | "image";
  dataKey: string;
  validatorKey: keyof Validator;
  /** CSS for text or <img> */
  properties: {
    styles?: CSSProperties;
    [key: string]: any;
  };
}

// Shape
interface ShapeConfig extends BaseElementConfig {
  type: "shape";
  dataKey: string;
  validatorKey: keyof Validator;
  shapeType: "circle" | "rect";
  properties: {
    styles: CSSProperties; // positioning & fill/stroke
    [key: string]: any;
  };
}

// QR Code
interface QRConfig extends BaseElementConfig {
  type: "qr";
  dataKey: string;
  /** No validator on QR value */
  validatorKey?: never;
  /** Props passed to <QRCode> */
  properties: Omit<QRCodeProps, "value"> & {
    /** positioning */
    styles?: CSSProperties;
  } & { value?: string };
}

export type ElementConfig = TextImageConfig | ShapeConfig | QRConfig;

export interface FaceConfig {
  backgroundColorKey: keyof ColorsMap;
  elements: ElementConfig[];
  properties: {
    styles: CSSProperties; // positioning & fill/stroke
    [key: string]: any;
  };
}

export interface CardConfig {
  front: FaceConfig;
  back: FaceConfig;
  colors: ColorsMap;
  validators: ValidatorsMap;
}
