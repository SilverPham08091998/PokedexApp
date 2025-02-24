export interface Item {
  id: number;
  name: string;
  cost: number;
  category: ResourceLink;
  attributes: ResourceLink[];
  baby_trigger_for: null | ResourceLink;
  effect_entries: EffectEntry[];
  flavor_text_entries: FlavorTextEntry[];
  fling_effect: null | string;
  fling_power: number;
  game_indices: GameIndex[];
  held_by_okemon: HeldItem[];
  machines: any[];
  names: TranslatedName[];
  sprites: ItemSprites;
}

export interface ResourceLink {
  name: string;
  url: string;
}

export interface EffectEntry {
  effect: string;
  short_effect: string;
  language: ResourceLink;
}

export interface FlavorTextEntry {
  language: ResourceLink;
  text: string;
  versionGroup: ResourceLink;
}

export interface GameIndex {
  game_index: number;
  generation: ResourceLink;
}

export interface HeldItem {
  pokemon: ResourceLink;
  version_details: VersionDetail[];
}

export interface VersionDetail {
  rarity: number;
  version: ResourceLink;
}

export interface TranslatedName {
  language: ResourceLink;
  name: string;
}

export interface ItemSprites {
  default: string;
}
