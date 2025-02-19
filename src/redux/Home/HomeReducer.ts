import { HOME_ACTION } from "./HomeAction";
import { HomeInitialStateType } from "@/redux/Home/Type";

const initialState: HomeInitialStateType = {
  pokemonInfo: {},
  versions: [],
  types: [],
  typeInfo: {},
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
    case HOME_ACTION.GET_POKEMON_INFO:
      return {
        ...state,
      };
    case HOME_ACTION.GET_POKEMON_INFO_SUCCESS:
      return {
        ...state,
        pokemonInfo: { ...action.payload },
      };
    case HOME_ACTION.GET_VERSION_POKEMON_SUCCESS:
      return {
        ...state,
        versions: action.payload,
      };
    case HOME_ACTION.GET_POKEMON_TYPE_SUCCESS:
      return {
        ...state,
        types: action.payload,
      };
    case HOME_ACTION.GET_POKEMON_TYPE_INFO_SUCCESS:
      return {
        ...state,
        typeInfo: { ...action.payload },
      };
    default:
      return {
        ...state,
      };
  }
};
export default HomeReducer;
