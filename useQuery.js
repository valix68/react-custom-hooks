import { useState, useRef } from "react";

/**
 * useQuery: Quản lý state cho object query (filter, search, sort, page, ...)
 * @param {Object} init - object khởi tạo query
 * @returns {Object} { query, updateQuery, resetQuery }
 */
const useQuery = (init = {}) => {
  const [query, setQuery] = useState(init);
  const initRef = useRef(init);

  // Cập nhật một phần query (giống setState cũ của class)
  const updateQuery = (partial) => {
    setQuery((prev) => ({ ...prev, ...partial }));
  };

  // Reset về giá trị khởi tạo
  const resetQuery = () => {
    setQuery(initRef.current);
  };

  return {
    query,
    updateQuery,
    resetQuery,
  };
};

export default useQuery;
