import axios, { Method } from "axios";
import { DOMAIN } from "./urlAPI";
import { ApiErrorResponse, ApiSuccessResponse, HttpMethod } from "@/type";
import qs from "qs";

interface configs {
  domain?: string;
  url?: string;
  authorization?: string;
  header?: Record<string, any>;
  params?: any;
  method: Method;
  options?: {
    json?: boolean;
    formData?: boolean;
    formUrlEncoded?: boolean;
  };
  timeout?: number;
}

export default class UtilApi {
  static request = <T>(configs: configs): Promise<ApiSuccessResponse<T>> => {
    let header: any = {
      "Content-Type": "application/x-www-form-urlencoded",
      ...configs.header,
    };
    
    const domain = configs.domain ? configs.domain : DOMAIN;

    configs.url = `${domain}/${configs.url}`;
    let data;
    if (configs.options?.json) {
      data = JSON.stringify(configs.params);
      header["Content-Type"] = "application/json";
    }
    if (configs.options?.formData) {
      if (configs.params instanceof FormData) {
        data = configs.params;
      } else {
        data = new FormData();
        for (const key in configs.params) {
          if (Object.prototype.hasOwnProperty.call(configs.params, key)) {
            data.append(key, configs.params[key]);
          }
        }
        header["Content-Type"] = "multipart/form-data";
      }
    }
    if (configs.options?.formUrlEncoded) {
      data = new URLSearchParams(configs.params).toString();
      header["Content-Type"] = "application/x-www-form-urlencoded";
    }

    return axios
      .request<ApiSuccessResponse<T>>({
        url: configs.url,
        timeout: configs.timeout || 60000,
        headers: header,
        method: configs.method,
        params:
          configs.method.toUpperCase() === HttpMethod.GET
            ? configs.params
            : undefined,
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: "comma" }).toString();
        },
        data:
          configs.method.toUpperCase() !== HttpMethod.GET ? data : undefined,
      })
      .then((response) => {
        return response.data as ApiSuccessResponse<T>;
      })
      .catch((error) => {
        return Promise.reject({
          ...error?.response?.data,
          statusCode: error.response.status,
        } as ApiErrorResponse);
      });
  };
}
