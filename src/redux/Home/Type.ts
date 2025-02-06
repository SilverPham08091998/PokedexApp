import { PokemonInfo, PokemonSpecies } from "@/type";

export interface HomeInitialStateType {
  listPokedex: Array<PokemonInfo>;
  pokemonInfo: {
    info?: PokemonInfo;
    species?: PokemonSpecies;
  };
}
