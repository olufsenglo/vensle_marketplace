import { useState, useEffect } from 'react';
import axios from 'axios';

const apiBaseURL = process.env.REACT_APP_API_BASE_URL;

const useFetch = (endpoint, queryParams = {}, params = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const mergedParams = { ...queryParams, ...params };
        const response = await axios.get(`${apiBaseURL}${endpoint}`, {
          params: mergedParams,
        });
        setData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };	  

    fetchData();
  }, [endpoint, queryParams, params]);

  return { data, loading, error };
};

export default useFetch;
