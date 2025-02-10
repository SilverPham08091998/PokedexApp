import { VersionGroupDetail } from "@/type/PokemonInfo";

export interface MoveInfo {
  id: number;
  name: string;
  accuracy: number | null;
  effect_chance: number | null;
  power: number | null;
  pp: number | null;
  priority: number;
  damage_class: ResourceLink;
  generation: ResourceLink;
  type: ResourceLink;
  target: ResourceLink;
  contest_combos: ContestCombos | null;
  contest_effect: ResourceURL | null;
  contest_type: ResourceLink;
  effect_entries: EffectEntry[];
  effect_changes: EffectChange[];
  flavor_text_entries: FlavorTextEntry[];
  learned_by_pokemon: ResourceLink[];
  machines: Machine[];
  meta: MoveMeta;
  past_values: PastMoveValue[];
}

export interface ContestCombos {
  normal: ComboDetail | null;
  super: ComboDetail | null;
}

export interface ComboDetail {
  use_after: ResourceLink[] | null;
  use_before: ResourceLink[] | null;
}

export interface EffectEntry {
  effect: string;
  short_effect: string;
  language: ResourceLink;
}

export interface EffectChange {
  version_group: ResourceLink;
  effect_entries: EffectEntry[];
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: ResourceLink;
  version_group: ResourceLink;
}

export interface Machine {
  machine: ResourceURL;
  version_group: ResourceLink;
}

export interface MoveMeta {
  ailment: ResourceLink;
  ailment_chance: number;
  category: ResourceLink;
  crit_rate: number;
  drain: number;
  flinch_chance: number;
  healing: number;
  max_hits: number | null;
  max_turns: number | null;
  min_hits: number | null;
  min_turns: number | null;
  stat_chance: number;
}

export interface PastMoveValue {
  accuracy: number | null;
  effect_chance: number | null;
  effect_entries: EffectEntry[];
  power: number | null;
  pp: number | null;
  type: ResourceLink | null;
  version_group: ResourceLink;
}

export interface ResourceLink {
  name: string;
  url: string;
}

export interface ResourceURL {
  url: string;
}

export interface PokemonMove {
  move: MoveInfo;
  version_group_details: VersionGroupDetail[];
}
