import { PokemonInfo, PokemonMove, PokemonType } from "@/type";
import { SCREEN_NAME } from "@/util";

export type RootStackParamList = {
  [SCREEN_NAME.POKEMONS]: undefined;
  [SCREEN_NAME.POKEMON_INFO]: { pokemon: PokemonInfo };
  [SCREEN_NAME.MOVES]: undefined;
  [SCREEN_NAME.MOVE_INFO]: { move: PokemonMove } | undefined;
  [SCREEN_NAME.ITEMS]: undefined;
  [SCREEN_NAME.MAIN]: undefined;
  [SCREEN_NAME.SPLASH]: undefined;
  [SCREEN_NAME.TYPES]: undefined;
  [SCREEN_NAME.TYPE_INFO]: { type: PokemonType } | undefined;
};
