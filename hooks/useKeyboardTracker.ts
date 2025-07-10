import { useRef, useEffect, RefObject } from 'react';

export function useSingleKeyTracker<T extends HTMLElement>(
  onKey: (keys: string[]) => void,
  preventDefault = true
): RefObject<T|null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const extract = (e: KeyboardEvent) => {
      const mods = {
        shift: e.shiftKey,
        ctrl: e.ctrlKey,
        alt: e.altKey,
        meta: e.metaKey,
      };
      const key = e.key.toLowerCase();
      const combo = [
        ...Object.entries(mods)
          .filter(([_, down]) => down)
          .map(([mod]) => mod),
        key,
      ];
      return Array.from(new Set(combo)); // dedupe
    };

    const handleDown = (e: KeyboardEvent) => {
      if (preventDefault) e.preventDefault();
      onKey(extract(e));
    };

    const handleBlur = () => {
      onKey([]); // clear on blur
    };

    el.addEventListener('keydown', handleDown);
    el.addEventListener('blur', handleBlur, true);

    return () => {
      el.removeEventListener('keydown', handleDown);
      el.removeEventListener('blur', handleBlur, true);
    };
  }, [onKey, preventDefault]);

  return ref;
}
