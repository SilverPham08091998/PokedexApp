import { PokemonInfo } from "@/type";

export const HOME_ACTION = {
  GET_POKEDEX: "GET_POKEDEX",
  GET_POKEDEX_SUCCESS: "GET_POKEDEX_SUCCESS",
  GET_POKEDEX_FAILED: "GET_POKEDEX_FAILED",

  GET_POKEMON_INFO: "GET_POKEMON_INFO",
  GET_POKEMON_INFO_SUCCESS: "GET_POKEMON_INFO_SUCCESS",
  GET_POKEMON_INFO_FAILED: "GET_POKEMON_INFO_FAILED",
};

export const getPokedex = (limit: number) => {
  return {
    type: HOME_ACTION.GET_POKEDEX,
    payload: limit,
  };
};
export const getPokemonInfo = (pokemon: PokemonInfo) => {
  return {
    type: HOME_ACTION.GET_POKEMON_INFO,
    payload: pokemon,
  };
};
export const HomeAction = {
  getPokedex,
  getPokemonInfo,
};
