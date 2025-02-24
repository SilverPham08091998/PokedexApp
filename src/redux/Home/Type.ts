import {
  EvolutionChain,
  Item,
  ListCommon,
  PokemonInfo,
  PokemonMove,
  PokemonSpecies,
  PokemonType,
  ResourceLink,
} from "@/type";
import { MoveInfo } from "@/type/Move";

export interface HomeInitialStateType {
  listPokedex?: ListCommon<PokemonInfo>;
  items?: ListCommon<Item>;
  pokemonInfo: {
    info?: PokemonInfo;
    species?: PokemonSpecies;
    evolution?: EvolutionChain;
    moves?: Array<PokemonMove>;
  };
  versions: Array<ResourceLink>;
  types: Array<PokemonType>;
  typeInfo: {
    moves: ListCommon<PokemonMove>;
    pokemons: ListCommon<PokemonInfo>;
    info?: PokemonType;
  };
  moveInfo: {
    info?: MoveInfo;
    learnedByPokemon: ListCommon<PokemonInfo>;
  };
}
