import Config from "react-native-config";

export const API = {
  LIST_POKEDEX: "pokemon?offset=0",
};

type PathParams = { [key: string]: string | number | undefined };

export const createPath = (path: string, params?: PathParams): string => {
  if (!params) {
    return path;
  }
  return path.replace(/{(\w+)}/g, (_, key) => params[key] as string);
};

export const DOMAIN = Config.API_URL;
