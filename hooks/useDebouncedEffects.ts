import React from 'react'

export function useDebouncedEffect(
  effect: () => void,
  deps: React.DependencyList,
  delay: number
) {
  React.useEffect(() => {
    const handler = setTimeout(() => {
      effect();
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, delay]);
}