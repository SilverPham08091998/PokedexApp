export interface PokemonInfo {
  abilities: Ability[];
  base_experience: number;
  cries: {
    latest: string;
    legacy: string;
  };
  forms: Form[];
  game_indices: GameIndex[];
  height: number;
  held_items: HeldItem[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_abilities: any[];
  past_types: any[];
  species: ResourceLink;
  sprites: Sprites;
  stats: Stat[];
  types: PokemonType[];
  weight: number;
}

export interface Ability {
  ability: ResourceLink;
  is_hidden: boolean;
  slot: number;
}

export interface ResourceLink {
  name: string;
  url: string;
}

export interface Form {
  name: string;
  url: string;
}

export interface GameIndex {
  game_index: number;
  version: ResourceLink;
}

export interface HeldItem {
  item: ResourceLink;
  version_details: VersionDetail[];
}

export interface VersionDetail {
  rarity: number;
  version: ResourceLink;
}

export interface Move {
  move: ResourceLink;
  version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: ResourceLink;
  version_group: ResourceLink;
}

export interface Sprites {
  back_default: string | null;
  back_female: string | null;
  back_shiny: string | null;
  back_shiny_female: string | null;
  front_default: string | null;
  front_female: string | null;
  front_shiny: string | null;
  front_shiny_female: string | null;
  other: OtherSprites;
  versions: Versions;
}

export interface OtherSprites {
  dream_world: SpriteVariant;
  home: SpriteVariant & {
    front_shiny_female: string | null;
  };
  official_artwork: SpriteVariant;
  showdown: SpriteVariant;
}

export interface SpriteVariant {
  front_default: string | null;
  front_female?: string | null;
  front_shiny?: string | null;
  back_default?: string | null;
}

export interface Versions {
  [generation: string]: {
    [game: string]: SpriteVariant;
  };
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: ResourceLink;
}

export interface PokemonType {
  slot: number;
  type: ResourceLink;
}

export interface ListPokedex {
  count: number;
  next: string;
  previous: string;
  results: Array<ResourceLink>;
}
