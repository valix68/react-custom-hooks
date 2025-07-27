import { useState, useEffect } from "react";

/**
 * Custom hook để fetch danh sách từ API.
 * @param {Function} fetchFunction - Hàm API trả về Promise (ví dụ: getOrgList, getOrgListMembers)
 * @param {Array|Object} params - Tham số truyền vào API (có thể là object hoặc array tuỳ API)
 * @param {Array} deps - Các dependencies để re-fetch (ví dụ: [params])
 * @param {string} listKey - Key chứa danh sách trong response (ví dụ: "organizations", "members")
 * @returns {Object} { data, loading, error, refetch }
 */
const useFetchList = (fetchFunction, params, deps = []) => {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = Array.isArray(params)
        ? await fetchFunction(...params)
        : await fetchFunction(params);

      let list = [];
      let meta = {};
      if (response) {
        list = response.results;
        meta = {
          count: response.count,
          next: response.next,
          previous: response.previous,
        };
      }
      setData(list || []);
      setMeta(meta);

      console.log("meta>>>", meta);
      console.log("data>>>", data);
    } catch (err) {
      setError(err);
      setData([]);
      setMeta({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, deps);

  return { data, meta, loading, error, refetch: fetchData };
};

export default useFetchList;
