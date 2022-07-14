import { useEffect, useState } from "react";

function useApi(url, defaultValue = []) {
  const [data, setData] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);


  
  useEffect(() => {
    setIsLoading(true);
    fetch(url)
      .then((res) => res.json())
      .then((json) => {
        setIsLoading(false);
        setData(json);
      })
      .catch((e) => {
        setIsLoading(false);
        setData(defaultValue);
        setLoadError(e);
      });
  }, [url]);

  return { data, isLoading, loadError };
}

export default useApi;
