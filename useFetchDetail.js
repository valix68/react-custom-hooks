import { useState, useEffect } from "react";

/**
 * Custom hook để fetch dữ liệu chi tiết (object) từ API.
 * @param {Function} fetchFunction - Hàm API trả về Promise (ví dụ: getOrgInfo, getUserProfile)
 * @param {Array|Object} params - Tham số truyền vào API (có thể là object hoặc array tuỳ API)
 * @param {Array} deps - Các dependencies để re-fetch (ví dụ: [params])
 * @returns {Object} { data, loading, error, refetch }
 */
const useFetchDetail = (fetchFunction, params, deps = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = Array.isArray(params)
        ? await fetchFunction(...params)
        : await fetchFunction(params);
      // Ưu tiên lấy response.data nếu có, nếu không lấy response
      setData(response?.data ?? response);
    } catch (err) {
      setError(err);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, deps);

  return { data, loading, error, refetch: fetchData };
};

export default useFetchDetail;
