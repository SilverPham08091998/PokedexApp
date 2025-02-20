import {
  EvolutionChain,
  ListCommon,
  PokemonInfo,
  PokemonMove,
  PokemonSpecies,
  PokemonType,
  ResourceLink,
} from "@/type";
import { MoveInfo } from "@/type/Move";

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
  moveInfo: {
    info?: MoveInfo;
    learnedByPokemon?: Array<PokemonInfo>;
  };
}
