import {
  EvolutionChain,
  ListCommon,
  PokemonInfo,
  PokemonMove,
  PokemonSpecies,
  PokemonType,
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
  types: Array<PokemonType>;
  typeInfo: {
    moves?: Array<PokemonMove>;
    pokemons?: Array<PokemonInfo>;
    info?: PokemonType;
  };
}
