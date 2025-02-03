import base64 from "react-native-base64";
import { Source } from "react-native-fast-image";
import { ImageURISource } from "react-native";

export const getSitecoreSource = (url: any) => {
  const username = "";
  const password = "";
  const authHeader = "Basic " + base64.encode(`${username}:${password}`);
  return url
    ? ({
        uri:
          "https://genvita-uat-sitecore.genvita.vn" ||
          "http://203.167.9.185:8080",
        headers: {
          Authorization: authHeader,
        },
        // eslint-disable-next-line prettier/prettier
        } as Source & ImageURISource)
    : undefined;
};
