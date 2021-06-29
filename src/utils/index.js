import { useRef, useEffect, useState } from "react";

export const isFalsy = (value) => (value === 0 ? false : !value);
export const isVoid = (value) =>
  value === undefined || value === null || value === "";

export const cleanObject = (object) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

export const subset = (entries, keys) => {
  const filtered = entries.filter(([key]) => keys.include(key));
  return Object.fromEntries(filtered);
};

/**
 * Custom Hooks
 */

export const useDebounce = (value, delay = undefined) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);

    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};

export const useMount = (callback) => {
  useEffect(() => {
    callback();
    // eslint-disable-next-line
  }, []);
};

export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};
