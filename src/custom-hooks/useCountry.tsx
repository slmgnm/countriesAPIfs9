import { useState, useEffect } from "react";
// import axios from "axios";

// axios.defaults.baseURL = "https://restcountries.com/v2";

const useCountry = (name:string) => {
  const [country, setCountry] = useState(null);
  const [error, setError] = useState<{}>();
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v2/name/${name}`
        );
        const data = await response.json();
        setCountry(data[0]);
        // console.log(data);
      } catch (error) {
        setError({error});
      }
    };

    fetchData();
  }, [name]);

  return [country, error];
};

export default useCountry;
