import qs from "qs";

const getQueryParams = <T extends Record<string, any>>(url: string): T => {
  const queryString = url.split("?")[1];
  if (!queryString) return {} as T;

  return qs.parse(queryString) as T;
};

export const URL_CONVERTER = {
  getQueryParams,
};
