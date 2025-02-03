import { HomeGetAccessTokenType } from "./Type";

export const HOME_ACTION = {
  GET_ACCESS_TOKEN: "HOME_GET_ACCESS_TOKEN",
  GET_REFRESH_TOKEN: "HOME_GET_REFRESH_TOKEN",
  GET_USER_NAME: "HOME_GET_USER_NAME",
  GET_ACCESS_TOKEN_SUCCESS: "HOME_GET_ACCESS_TOKEN_SUCCESS",
  GET_ACCESS_TOKEN_FAIL: "HOME_GET_ACCESS_TOKEN_FAIL",
};

export const getAccessToken = (payload: HomeGetAccessTokenType) => {
  return {
    type: HOME_ACTION.GET_ACCESS_TOKEN,
    payload: payload,
  };
};
export const getAccessTokenSuccess = (payload: any) => {
  return {
    type: HOME_ACTION.GET_ACCESS_TOKEN_SUCCESS,
    payload: payload,
  };
};
export const getAccessTokenFail = (payload: any) => {
  return {
    type: HOME_ACTION.GET_ACCESS_TOKEN_FAIL,
    payload: payload,
  };
};
export default {
  getAccessToken,
  getAccessTokenFail,
  getAccessTokenSuccess,
  HOME_ACTION,
};
