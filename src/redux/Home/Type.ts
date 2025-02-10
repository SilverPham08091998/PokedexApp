import {
  EvolutionChain,
  PokemonInfo,
  PokemonMove,
  PokemonSpecies,
  ResourceLink,
} from "@/type";

export interface HomeInitialStateType {
  listPokedex: Array<PokemonInfo>;
  pokemonInfo: {
    info?: PokemonInfo;
    species?: PokemonSpecies;
    evolution?: EvolutionChain;
    moves?: Array<PokemonMove>;
  };
  versions: Array<ResourceLink>;
}
