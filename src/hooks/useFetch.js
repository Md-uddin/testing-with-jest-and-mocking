import React, { useEffect, useState } from "react";

const useFetch = ({ URL }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(URL)
      .then((response) => response.json())
      .then((data) => {
        setIsLoading(false);
        setData(data);
      });
  }, [URL]);

  return {
    data,
    isLoading,
  };
};

export default useFetch;
