import {useState, useEffect, DependencyList} from 'react';

export const useDebouncedEffect = (
  callback: () => void,
  delay: number,
  dependencies: DependencyList,
) => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const id = setTimeout(callback, delay);

    setTimeoutId(id);

    return () => {
      clearTimeout(id);
    };
  }, dependencies);
};
