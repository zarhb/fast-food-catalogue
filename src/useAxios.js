import { useEffect, useState } from "react";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-mini-projects-api.classbon.com/",
});

const useAxios = (axiosParams) => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoding] = useState(true);

  useEffect(() => {
    fetchData();
  }, [axiosParams.url]);

  const fetchData = async () => {
    const result = await instance.request(axiosParams);
    try {
      setResponse(result.data);
      console.log(response);
    } catch (error) {
      setError(error);
    } finally {
      setLoding(false);
    }
  };
  return [response, error, loading ];
};

export default useAxios;
