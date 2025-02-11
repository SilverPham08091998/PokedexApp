import {
  EvolutionChain,
  ListCommon,
  PokemonInfo,
  PokemonMove,
  PokemonSpecies,
  ResourceLink,
} from "@/type";

export interface HomeInitialStateType {
  listPokedex?: ListCommon;
  pokemonInfo: {
    info?: PokemonInfo;
    species?: PokemonSpecies;
    evolution?: EvolutionChain;
    moves?: Array<PokemonMove>;
  };
  versions: Array<ResourceLink>;
}
