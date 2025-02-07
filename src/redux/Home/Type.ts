import { EvolutionChain, PokemonInfo, PokemonSpecies } from "@/type";

export interface HomeInitialStateType {
  listPokedex: Array<PokemonInfo>;
  pokemonInfo: {
    info?: PokemonInfo;
    species?: PokemonSpecies;
    evolution?: EvolutionChain;
  };
}
