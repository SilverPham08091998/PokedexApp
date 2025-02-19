export const PokemonTypeColors: Record<string, string> = {
  NORMAL: "#A8A77A",
  FIGHTING: "#C22E28",
  FLYING: "#A98FF3",
  GROUND: "#E2BF65",
  POISON: "#A33EA1",
  ROCK: "#B6A136",
  BUG: "#A6B91A",
  GHOST: "#735797",
  STEEL: "#B7B7CE",
  FIRE: "#EE8130",
  WATER: "#6390F0",
  GRASS: "#74CB48",
  ELECTRIC: "#F7D02C",
  PSYCHIC: "#F95587",
  ICE: "#96D9D6",
  DRAGON: "#6F35FC",
  DARK: "#705746",
  FAIRY: "#D685AD",
};

export interface PokemonType {
  id: number;
  name: string;
  damage_relations: DamageRelations;
  game_indices: GameIndex[];
  generation: ResourceLink;
  move_damage_class: ResourceLink;
  moves: ResourceLink[];
  names: TranslatedName[];
  past_damage_relations: any[];
  pokemon: TypePokemon[];
  sprites: TypeSprites;
}

export interface DamageRelations {
  double_damage_from: ResourceLink[];
  double_damage_to: ResourceLink[];
  half_damage_from: ResourceLink[];
  half_damage_to: ResourceLink[];
  no_damage_from: ResourceLink[];
  no_damage_to: ResourceLink[];
}

export interface GameIndex {
  game_index: number;
  generation: ResourceLink;
}

export interface TranslatedName {
  language: ResourceLink;
  name: string;
}

export interface TypePokemon {
  pokemon: ResourceLink;
  slot: number;
}

export interface TypeSprites {
  [generation: string]: {
    [game: string]: {
      name_icon: string;
    };
  };
}

export interface ResourceLink {
  name: string;
  url: string;
}
