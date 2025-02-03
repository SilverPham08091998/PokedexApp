import { COLORS_LIGHT } from "@/theme";
import { AppStateInitialType } from "@/redux/AppState/AppStateType";
import { APP_STATE_ACTION } from "@/redux/AppState/AppStateAction";

const initialState: AppStateInitialType = {
  theme: COLORS_LIGHT,
  language: "vi",
  loading: false,
  isConnected: false,
};

const AppStateReducer = (
  state: AppStateInitialType = initialState,
  action: {
    type: string;
    payload: any;
  }
): AppStateInitialType => {
  switch (action.type) {
    case APP_STATE_ACTION.LOADING_SHOW:
      return {
        ...state,
        loading: true,
      };
    case APP_STATE_ACTION.LOADING_HIDE:
      return {
        ...state,
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
};
export default AppStateReducer;
