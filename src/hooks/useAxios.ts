import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { useAuth } from "../context/AuthContext";
import config from "../config/config";

const useAxios = (): AxiosInstance => {
  const { token } = useAuth();

  const axiosInstance = axios.create({
    baseURL: config.baseUrl,
    withCredentials: true,
  });

  if (token) {
    axiosInstance.interceptors.request.use(
      (config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError) => {
      const { response } = error;

      if (response) {
        const { status } = response;
        const errorResponse = response.data as { message: string };

        switch (status) {
          case 400:
            return Promise.reject("Bad Request: Invalid data received.");
          case 401:
            return Promise.reject(
              errorResponse.message ||
                "An error occured. Please try again later"
            );
          case 404:
            return Promise.reject(errorResponse.message || "Data not found");
          case 409:
            return Promise.reject(
              errorResponse.message || "Data already exists"
            );
          case 422:
            const responseData = response.data as { errors: string[] };
            const validationErrors = responseData.errors;
            return Promise.reject(
              `Validation Error: ${validationErrors.join(", ")}`
            );
          case 500:
            return Promise.reject("Internal Server Error");
          default:
            return Promise.reject(`Unexpected Error: ${response.statusText}`);
        }
      } else {
        return Promise.reject(
          "Network Error: Failed to fetch data from the server."
        );
      }
    }
  );

  return axiosInstance;
};

export default useAxios;
