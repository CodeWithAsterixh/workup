import {
  ElementConfig,
} from "@/components/models/CardRenderer/types";
interface Slot {
    children:React.ReactNode
}

export interface SelectedCardItem {
    isSelectable: boolean;
    selected?: ElementConfig;
    onSelected?: (el: ElementConfig) => void;
  };

  export type DotNestedKeys<T> = T extends object
    ? {
        [K in Extract<keyof T, string>]: T[K] extends object
          ? K | `${K}.${DotNestedKeys<T[K]>}`
          : K;
      }[Extract<keyof T, string>]
    : never;
      export type DotNestedKeysTypes<T> = T extends object
    ? {
        [K in Extract<keyof T, string>]: T[K] extends object
          ? typeof K | `${DotNestedKeys<T[K]>}`
          : typeof K;
      }[Extract<keyof T, string>]
    : never;

export type activityStatus = "online" | "offline";
export type healthStatus = "good" | "bad";
export interface pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
export interface generalResponse {
  status: healthStatus;
  connectionActivity: activityStatus;
  statusCode: number;
  message?: string;
}
