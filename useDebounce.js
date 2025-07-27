import { useState, useEffect, useMemo } from "react";

/**
 * Debounce value hoặc query object
 * - Nếu value là primitive (string/number/boolean) → debounce trực tiếp
 * - Nếu value là object → debounce riêng field `search`, giữ nguyên các field khác
 * 
 * @param {*} value - giá trị hoặc query object
 * @param {number} delay - thời gian debounce (ms)
 * @returns {*} debouncedValue
 */
export default function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  // Nếu là object → chỉ debounce field `search`
  const processedValue = useMemo(() => {
    if (value !== null && typeof value === "object" && !Array.isArray(value)) {
      return {
        ...value,
        search: debounced.search !== undefined ? debounced.search : value.search,
      };
    }
    return debounced; // nếu không phải object → trả luôn debounced primitive
  }, [debounced, value]);

  return processedValue;
}
