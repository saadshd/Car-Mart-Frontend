import { useState, useEffect } from "react";
import axios from "axios";
import { CarType } from "../entities/carInventory/interface";
import { CustomerType } from "../entities/customer/interface";
import { SalesPersonType } from "../entities/salesPerson/interface";

const authenticatedAxios = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
  withCredentials: true,
});

interface ApiResponse {
  meta: ApiResponseMeta;
  data: CarType[] | CustomerType[] | SalesPersonType[];
  loading: boolean;
  error: any;
}

interface ApiResponseMeta {
  message: string;
  page?: number;
  limit?: number;
  totalPages?: number;
  totalItems?: number;
}

interface RequestOptions {
  method: "get" | "post" | "put" | "delete";
  endpoint: string;
  params?: string;
  data?: CarType[] | CustomerType[] | SalesPersonType[];
}

function useHttpRequest(options: RequestOptions): ApiResponse {
  const [response, setResponse] = useState<ApiResponse>({
    meta: {
      message: "",
      page: 0,
      limit: 0,
      totalPages: 0,
      totalItems: 0,
    },
    data: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setResponse((prevState) => ({
          ...prevState,
          loading: true,
          error: null,
        }));

        const response = await authenticatedAxios.request({
          url: options.endpoint,
          method: options.method,
          params: options.params,
          data: options.data,
        });

        setResponse({
          meta: response.data.meta,
          data: response.data.data,
          loading: false,
          error: null,
        });
      } catch (error) {
        setResponse((prevState) => ({
          ...prevState,
          loading: false,
          error: error,
        }));
      }
    };

    fetchData();
  }, [options.endpoint, options.method, options.params, options.data]);

  return response;
}

export default useHttpRequest;
