import { PayloadActionType } from "@/type";

const APP_STATE_ACTION = {
  LOADING_SHOW: "LOADING_SHOW",
  LOADING_HIDE: "LOADING_HIDE",
  IS_CHECK_CONNECTED_INTERNET: "IS_CHECK_CONNECTED_INTERNET",
  SET_UP_APP: "SET_UP_APP",
  SET_UP_APP_SUCCESS: "SET_UP_APP_SUCCESS",
  SET_UP_APP_FAIL: "SET_UP_APP_FAIL",
};
const setUpApp = (): PayloadActionType<{}> => {
  return {
    type: APP_STATE_ACTION.SET_UP_APP,
    payload: {},
  };
};

const AppStateAction = {
  setUpApp,
};

export { AppStateAction, APP_STATE_ACTION };
