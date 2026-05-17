import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import axios from "axios";
import supabase from "../config/supabase";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session?.access_token) {
          config.headers.Authorization = `Bearer ${session.access_token}`;
        }
        return config;
      },
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          await logout();
          navigate("/login");
        }
        return Promise.reject(error);
      },
    );
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  return axiosSecure;
};

export default useAxiosSecure;
