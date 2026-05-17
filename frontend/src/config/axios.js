import axios from "axios";

const axiosIntercept = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxios = () => {
  return axiosIntercept;
};

export default useAxios;
