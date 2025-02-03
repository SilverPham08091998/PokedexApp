import { HOME_ACTION } from "./HomeAction";
import { HomeInitialStateType } from "@/redux/Home/Type";

const initialState: HomeInitialStateType = {
  accessToken: "",
  refreshToken: "",
  userName: "",
};

const HomeReducer = (
  state: HomeInitialStateType = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case HOME_ACTION.GET_ACCESS_TOKEN:
      return {
        ...state,
      };
    case HOME_ACTION.GET_ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        accessToken: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
export default HomeReducer;
