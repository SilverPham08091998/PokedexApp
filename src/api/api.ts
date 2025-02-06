import axios, { Method } from "axios";
import { DOMAIN } from "./urlAPI";
import { ApiErrorResponse, HttpMethod } from "@/type";
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
  static request = <T>(configs: configs): Promise<T> => {
    let header: Record<string, any> = {
      ...configs.header,
    };

    const domain = configs.domain ? configs.domain : DOMAIN;
    configs.url = configs.domain ? configs.domain : `${domain}/${configs.url}`;
    let data;
    if (configs.options?.json) {
      data = JSON.stringify(configs.params);
      header["Content-Type"] = "application/json";
    }

    return axios
      .request<T>({
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
        return response.data as T;
      })
      .catch((error) => {
        return Promise.reject({
          ...error?.response?.data,
          statusCode: error.response.status,
        } as ApiErrorResponse);
      });
  };
}
