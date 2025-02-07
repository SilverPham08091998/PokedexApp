export interface Item {
  id: number;
  name: string;
  cost: number;
  category: ResourceLink;
  attributes: ResourceLink[];
  babyTriggerFor: null | ResourceLink;
  effectEntries: EffectEntry[];
  flavorTextEntries: FlavorTextEntry[];
  flingEffect: null | string;
  flingPower: number;
  gameIndices: GameIndex[];
  heldByPokemon: HeldItem[];
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
  shortEffect: string;
  language: ResourceLink;
}

export interface FlavorTextEntry {
  language: ResourceLink;
  text: string;
  versionGroup: ResourceLink;
}

export interface GameIndex {
  gameIndex: number;
  generation: ResourceLink;
}

export interface HeldItem {
  pokemon: ResourceLink;
  versionDetails: VersionDetail[];
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
