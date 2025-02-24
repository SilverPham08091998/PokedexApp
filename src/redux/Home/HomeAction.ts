import { PayloadActionType, PokemonInfo, PokemonType } from "@/type";
import { MoveInfo } from "@/type/Move";

export const HOME_ACTION = {
  GET_POKEDEX: "GET_POKEDEX",
  GET_POKEDEX_SUCCESS: "GET_POKEDEX_SUCCESS",
  GET_POKEDEX_FAILED: "GET_POKEDEX_FAILED",

  GET_POKEMON_INFO: "GET_POKEMON_INFO",
  GET_POKEMON_INFO_SUCCESS: "GET_POKEMON_INFO_SUCCESS",
  GET_POKEMON_INFO_FAILED: "GET_POKEMON_INFO_FAILED",

  GET_VERSION_POKEMON: "GET_VERSION_POKEMON",
  GET_VERSION_POKEMON_SUCCESS: "GET_VERSION_POKEMON_SUCCESS",
  GET_VERSION_POKEMON_FAILED: "GET_VERSION_POKEMON_FAILED",

  GET_POKEMON_TYPE: "GET_POKEMON_TYPE",
  GET_POKEMON_TYPE_SUCCESS: "GET_POKEMON_TYPE_SUCCESS",
  GET_POKEMON_TYPE_FAILED: "GET_POKEMON_TYPE_FAILED",

  GET_POKEMON_TYPE_INFO: "GET_POKEMON_TYPE_INFO",
  GET_POKEMON_TYPE_INFO_SUCCESS: "GET_POKEMON_TYPE_INFO_SUCCESS",
  GET_POKEMON_TYPE_INFO_FAILED: "GET_POKEMON_TYPE_INFO_FAILED",

  GET_POKEMON_MOVE_INFO: "GET_POKEMON_MOVE_INFO",
  GET_POKEMON_MOVE_INFO_SUCCESS: "GET_POKEMON_MOVE_INFO_SUCCESS",
  GET_POKEMON_MOVE_INFO_FAILED: "GET_POKEMON_MOVE_INFO_FAILED",

  GET_PAGE_LEARNT_BY_POKEMON: "GET_PAGE_LEARNT_BY_POKEMON",
  GET_PAGE_LEARNT_BY_POKEMON_SUCCESS: "GET_PAGE_LEARNT_BY_POKEMON_SUCCESS",
  GET_PAGE_LEARNT_BY_POKEMON_FAILED: "GET_PAGE_LEARNT_BY_POKEMON_FAILED",

  GET_POKEMON_ITEM: "GET_POKEMON_ITEM",
  GET_POKEMON_ITEM_SUCCESS: "GET_POKEMON_ITEM_SUCCESS",
  GET_POKEMON_ITEM_FAILED: "GET_POKEMON_ITEM_FAILED",

  GET_PAGE_POKEMON_OF_TYPE: "GET_PAGE_POKEMON_OF_TYPE",
  GET_PAGE_POKEMON_OF_TYPE_SUCCESS: "GET_PAGE_POKEMON_OF_TYPE_SUCCESS",
  GET_PAGE_POKEMON_OF_TYPE_FAILED: "GET_PAGE_POKEMON_OF_TYPE_FAILED",

  GET_PAGE_MOVE_OF_TYPE: "GET_PAGE_MOVE_OF_TYPE",
  GET_PAGE_MOVE_OF_TYPE_SUCCESS: "GET_PAGE_MOVE_OF_TYPE_SUCCESS",
  GET_PAGE_MOVE_OF_TYPE_FAILED: "GET_PAGE_MOVE_OF_TYPE_FAILED",
};

export const getPokedex = (url: string): PayloadActionType<string> => {
  return {
    type: HOME_ACTION.GET_POKEDEX,
    payload: url,
    isShowLoading: true,
  };
};

export const getVersionPokemon = () => {
  return {
    type: HOME_ACTION.GET_VERSION_POKEMON,
  };
};

export const getPokemonType = () => {
  return {
    type: HOME_ACTION.GET_POKEMON_TYPE,
  };
};
export const getPokemonInfo = (
  pokemon: PokemonInfo,
  callback?: () => void
): PayloadActionType<PokemonInfo> => {
  return {
    type: HOME_ACTION.GET_POKEMON_INFO,
    payload: pokemon,
    callback: callback,
  };
};
export const getTypeInfo = (
  type: PokemonType,
  callback?: () => void
): PayloadActionType<PokemonType> => {
  return {
    type: HOME_ACTION.GET_POKEMON_TYPE_INFO,
    payload: type,
    callback: callback,
  };
};
export const getMoveInfo = (
  move: MoveInfo,
  callback?: () => void
): PayloadActionType<MoveInfo> => {
  return {
    type: HOME_ACTION.GET_POKEMON_MOVE_INFO,
    payload: move,
    callback: callback,
  };
};

export const getPageLearntByPokemon = (
  page: number
): PayloadActionType<number> => {
  return {
    type: HOME_ACTION.GET_PAGE_LEARNT_BY_POKEMON,
    payload: page,
  };
};

export const getPokemonItem = (url: string): PayloadActionType<string> => {
  return {
    type: HOME_ACTION.GET_POKEMON_ITEM,
    payload: url,
    isShowLoading: true,
  };
};

export const getPagePokemonOfType = (
  page: number
): PayloadActionType<number> => {
  return {
    type: HOME_ACTION.GET_PAGE_POKEMON_OF_TYPE,
    payload: page,
  };
};
export const getPageMoveOfType = (page: number): PayloadActionType<number> => {
  return {
    type: HOME_ACTION.GET_PAGE_MOVE_OF_TYPE,
    payload: page,
  };
};

export const HomeAction = {
  getPokedex,
  getPokemonInfo,
  getVersionPokemon,
  getPokemonType,
  getTypeInfo,
  getMoveInfo,
  getPageLearntByPokemon,
  getPokemonItem,
  getPageMoveOfType,
  getPagePokemonOfType,
};
