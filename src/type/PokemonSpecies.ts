export interface PokemonSpecies {
  base_happiness: number;
  capture_rate: number;
  color: ResourceLink;
  egg_groups: ResourceLink[];
  evolution_chain: ResourceURL;
  evolves_from_species: ResourceLink;
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: any[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: Genus[];
  generation: ResourceLink;
  growth_rate: ResourceLink;
  habitat: ResourceLink;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: TranslatedName[];
  order: number;
  pal_park_encounters: PalParkEncounter[];
  pokedex_numbers: PokedexEntry[];
  shape: ResourceLink;
  varieties: PokemonVariety[];
}

export interface ResourceLink {
  name: string;
  url: string;
}

export interface ResourceURL {
  url: string;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: ResourceLink;
  version: ResourceLink;
}

export interface Genus {
  genus: string;
  language: ResourceLink;
}

export interface TranslatedName {
  language: ResourceLink;
  name: string;
}

export interface PalParkEncounter {
  area: ResourceLink;
  base_score: number;
  rate: number;
}

export interface PokedexEntry {
  entry_number: number;
  pokedex: ResourceLink;
}

export interface PokemonVariety {
  is_default: boolean;
  pokemon: ResourceLink;
}
