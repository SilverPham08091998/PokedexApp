import { ImageSourcePropType } from "react-native";
import { IMAGE_URL } from "@/theme";

export const PokemonTypeColors: Record<string, string> = {
  NORMAL: "#9298A4",
  FIGHTING: "#CE4265",
  FLYING: "#90A7DA",
  GROUND: "#DC7545",
  POISON: "#A864C7",
  ROCK: "#C5B489",
  BUG: "#92BC2C",
  GHOST: "#516AAC",
  STEEL: "#52869D",
  FIRE: "#FB9B51",
  WATER: "#559EDF",
  GRASS: "#5FBC51",
  ELECTRIC: "#EDD53E",
  PSYCHIC: "#F66F71",
  ICE: "#70CCBD",
  DRAGON: "#0C69C8",
  DARK: "#595761",
  FAIRY: "#EC8CE5",
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

type PokemonTypeInfo = {
  color: string;
  typeImage: ImageSourcePropType;
  tagImage: ImageSourcePropType;
};

// Danh sách các hệ Pokémon
export const PokemonTypes: Record<string, PokemonTypeInfo> = {
  NORMAL: {
    color: PokemonTypeColors.NORMAL,
    typeImage: IMAGE_URL.normal_type,
    tagImage: IMAGE_URL.normal_tag,
  },
  FIRE: {
    color: PokemonTypeColors.FIRE,
    typeImage: IMAGE_URL.fire_type,
    tagImage: IMAGE_URL.fire_tag,
  },
  WATER: {
    color: PokemonTypeColors.WATER,
    typeImage: IMAGE_URL.water_type,
    tagImage: IMAGE_URL.water_tag,
  },
  GRASS: {
    color: PokemonTypeColors.GRASS,
    typeImage: IMAGE_URL.grass_type,
    tagImage: IMAGE_URL.grass_tag,
  },
  ELECTRIC: {
    color: PokemonTypeColors.ELECTRIC,
    typeImage: IMAGE_URL.electric_type,
    tagImage: IMAGE_URL.electric_tag,
  },
  ICE: {
    color: PokemonTypeColors.ICE,
    typeImage: IMAGE_URL.ice_type,
    tagImage: IMAGE_URL.ice_tag,
  },
  FIGHTING: {
    color: PokemonTypeColors.FIGHTING,
    typeImage: IMAGE_URL.fighting_type,
    tagImage: IMAGE_URL.fighting_tag,
  },
  POISON: {
    color: PokemonTypeColors.POISON,
    typeImage: IMAGE_URL.poison_type,
    tagImage: IMAGE_URL.poison_tag,
  },
  GROUND: {
    color: PokemonTypeColors.GROUND,
    typeImage: IMAGE_URL.ground_type,
    tagImage: IMAGE_URL.ground_tag,
  },
  FLYING: {
    color: PokemonTypeColors.FLYING,
    typeImage: IMAGE_URL.flying_type,
    tagImage: IMAGE_URL.flying_tag,
  },
  PSYCHIC: {
    color: PokemonTypeColors.PSYCHIC,
    typeImage: IMAGE_URL.psychic_type,
    tagImage: IMAGE_URL.psychic_tag,
  },
  BUG: {
    color: PokemonTypeColors.BUG,
    typeImage: IMAGE_URL.bug_type,
    tagImage: IMAGE_URL.bug_tag,
  },
  ROCK: {
    color: PokemonTypeColors.ROCK,
    typeImage: IMAGE_URL.rock_type,
    tagImage: IMAGE_URL.rock_tag,
  },
  GHOST: {
    color: PokemonTypeColors.GHOST,
    typeImage: IMAGE_URL.ghost_type,
    tagImage: IMAGE_URL.ghost_tag,
  },
  DRAGON: {
    color: PokemonTypeColors.DRAGON,
    typeImage: IMAGE_URL.dragon_type,
    tagImage: IMAGE_URL.dragon_tag,
  },
  DARK: {
    color: PokemonTypeColors.DARK,
    typeImage: IMAGE_URL.dark_type,
    tagImage: IMAGE_URL.dark_tag,
  },
  STEEL: {
    color: PokemonTypeColors.STEEL,
    typeImage: IMAGE_URL.steel_type,
    tagImage: IMAGE_URL.steel_tag,
  },
  FAIRY: {
    color: PokemonTypeColors.FAIRY,
    typeImage: IMAGE_URL.fairy_type,
    tagImage: IMAGE_URL.fairy_tag,
  },
};

export default PokemonTypes;
