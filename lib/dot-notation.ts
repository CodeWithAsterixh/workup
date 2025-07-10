/* eslint-disable @typescript-eslint/no-explicit-any */

import { DotNestedKeys } from "@/types";

export function flattenToDotNotation<T>(obj: T|any, prefix = ""): Record<DotNestedKeys<T>, any> {
  if(!obj) return obj
  return Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === "object" && !Array.isArray(value)) {
      Object.assign(acc, flattenToDotNotation(value, newKey));
    } else {
      acc[newKey] = value;
    }
    return acc;
  }, {} as Record<string, any>);
}


export function expandFromDotNotation(flat: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};

  for (const flatKey in flat) {
    const value = flat[flatKey];
    const keys = flatKey.split(".");

    // walk/build nested objects
    let cursor = result;
    for (let i = 0; i < keys.length; i++) {
      const part = keys[i];

      // last segment? assign the value
      if (i === keys.length - 1) {
        cursor[part] = value;
      } else {
        // if next level doesn’t exist or isn’t an object, overwrite it
        if (
          cursor[part] === undefined ||
          typeof cursor[part] !== "object" ||
          Array.isArray(cursor[part])
        ) {
          cursor[part] = {};
        }
        cursor = cursor[part];
      }
    }
  }

  return result;
}

