import React, { useEffect, useState } from "react";

const useFetch = (url) => {
  const [apiData, setApiData] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [apiLoading, setApiLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setApiLoading(true);
      try {
        const res = await fetch(url);
        const json = await res.json();
        setApiData(json);
        setApiLoading(false);
      } catch (error) {
        setApiError(error);
        setApiLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { apiLoading, apiError, apiData };
};

export default useFetch;
