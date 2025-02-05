export interface ApiSuccessResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  statusCode: number;
  error: string;
  message: string;
  path: string;
  metaData: any;
  timestamp: Date;
  trace: string;
}

export const HttpMethod = {
  POST: "POST",
  GET: "GET",
  DELETE: "DELETE",
  PUT: "PUT",
};

export interface BaseOption {
  value: string | number;
  label: string;
}

export interface UserProfileType {
  fullName: string;
  firstName: string;
  lastName: string;
  middleName: string;
  gender: Gender;
  birthday: Date;
  nationalIdType: string;
  nationalId: string;
  nationalIdIssueDate: Date;
  nationalIdIssuer: number;
  nationalIdIssuerDesc: string;
  phoneNumberFirst: string;
  phoneNumberSecond?: string;
  email: string;
  userId: string;
  fileId: number;
  resourceUrl: string;
}

export enum Gender {
  MALE = "M",
  FEMALE = "F",
  OTHER = "O",
}

export interface RoutesType {
  key: string;
  title: string;
  disable: boolean;
  index: number;
}

export interface PaginationType<T> {
  list: Array<T>;
  totalPage?: number;
  currentPage?: number;
  size?: number;
  totalItem?: number;
  totalItemPerPage?: number;
  isPrevious?: boolean;
  isNext?: boolean;
}

export interface PayloadActionType<T> {
  type: string;
  payload: T;
  id?: number | string;
  callback?: () => void;
  isShowLoading?: boolean;
}

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
