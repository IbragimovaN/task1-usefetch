import { useEffect, useState } from "react";

export const useFetch = (URL) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (url) => {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((e) => setError(e))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if (URL) {
      fetchData(URL);
    }
  }, [URL]);

  const refetch = async ({ params }) => {
    const keys = Object.keys(params);
    const srtArr = [];

    keys.forEach((key) => {
      let str = `${key}=${params[key]}`;
      srtArr.push(str);
    });

    await fetchData(`${URL}?${srtArr.join("&")}`);
  };

  return { data, isLoading, error, refetch };
};
