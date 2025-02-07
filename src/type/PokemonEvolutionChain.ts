import { PokemonInfo } from "@/type/PokemonInfo";
import { Item } from "@/type/Item";

export interface EvolutionChain {
  baby_trigger_item: null | ResourceLink;
  chain: EvolutionNode;
  id: number;
}

export interface EvolutionNode {
  evolution_details: EvolutionDetail[];
  evolves_to: EvolutionNode[];
  is_baby: boolean;
  species: ResourceLink;
  pokemon: PokemonInfo;
}

export interface EvolutionDetail {
  gender: null | number;
  held_item: null | ResourceLink;
  item: null | Item;
  known_move: null | ResourceLink;
  known_move_type: null | ResourceLink;
  location: null | ResourceLink;
  min_affection: null | number;
  min_beauty: null | number;
  min_happiness: null | number;
  min_level: null | number;
  needs_overworld_rain: boolean;
  party_species: null | ResourceLink;
  party_type: null | ResourceLink;
  relative_physical_stats: null | number;
  time_of_day: string;
  trade_species: null | ResourceLink;
  trigger: ResourceLink;
  turn_upside_down: boolean;
}

export interface ResourceLink {
  name: string;
  url: string;
}
