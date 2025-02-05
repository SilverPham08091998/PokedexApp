import { HOME_ACTION } from "./HomeAction";
import { HomeInitialStateType } from "@/redux/Home/Type";

const initialState: HomeInitialStateType = {
  listPokedex: [],
};

const HomeReducer = (
  state: HomeInitialStateType = initialState,
  action: { type: string; payload: any }
) => {
  switch (action.type) {
    case HOME_ACTION.GET_POKEDEX:
      return {
        ...state,
      };
    case HOME_ACTION.GET_POKEDEX_SUCCESS:
      return {
        ...state,
        listPokedex: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
export default HomeReducer;
