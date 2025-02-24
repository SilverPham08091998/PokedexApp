import { HOME_ACTION } from "./HomeAction";
import { HomeInitialStateType } from "@/redux/Home/Type";
import { RootState } from "@/core/store";

const initialState: HomeInitialStateType = {
  pokemonInfo: {},
  versions: [],
  types: [],
  typeInfo: {
    moves: {
      data: [],
      results: [],
      page: 0,
      next: "",
      previous: "",
      count: 0,
    },
    pokemons: {
      data: [],
      results: [],
      page: 0,
      next: "",
      previous: "",
      count: 0,
    },
  },
  moveInfo: {
    learnedByPokemon: {
      data: [],
      results: [],
      page: 0,
      next: "",
      previous: "",
      count: 0,
    },
  },
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
    case HOME_ACTION.GET_POKEMON_TYPE_INFO:
      return {
        ...state,
        typeInfo: {
          ...initialState.typeInfo,
        },
      };
    case HOME_ACTION.GET_PAGE_POKEMON_OF_TYPE_SUCCESS:
    case HOME_ACTION.GET_PAGE_MOVE_OF_TYPE_SUCCESS:
    case HOME_ACTION.GET_POKEMON_TYPE_INFO_SUCCESS:
      return {
        ...state,
        typeInfo: { ...state.typeInfo, ...action.payload },
      };
    case HOME_ACTION.GET_POKEMON_MOVE_INFO_SUCCESS:
    case HOME_ACTION.GET_PAGE_LEARNT_BY_POKEMON_SUCCESS:
      return {
        ...state,
        moveInfo: { ...state.moveInfo, ...action.payload },
      };
    case HOME_ACTION.GET_POKEMON_ITEM_SUCCESS:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
export default HomeReducer;

export const getHomeReducer = (state: RootState) => state.home;
