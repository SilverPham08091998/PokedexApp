const convertObjToQueryString = (obj: any) => {
  const keyValuePairs = [];
  for (const key in obj) {
    keyValuePairs.push(
      encodeURIComponent(key) + "=" + encodeURIComponent(obj[key])
    );
  }
  return keyValuePairs.join("&");
};

const getValueFromArray = <T>(
  value: string | number | undefined,
  arr: Array<T>,
  field: string
): T => {
  if (value) {
    // @ts-ignore
    const object = arr.find((item) => item[field] === value);
    return object as T;
  }
  return {} as T;
};

const OBJECT_CONVERTER = {
  convertObjToQueryString,
  getValueFromArray,
};
export { OBJECT_CONVERTER };
