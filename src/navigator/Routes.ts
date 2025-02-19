import { ProductStackParamList } from "./ProductStackNavigator/ProductStackParamList";
import { CategoriesStackParamList } from "./TabHomeNavigator/Categories/CategoriesStackParamsList";
import { SettingStackParamList } from "./SettingStackNavigator/SettingStackParamList";
import { PokemonInfoStackParamList } from "./PokemonInfoNavigator/PokemonInfoStackParamList";

export type RootStackParamList = {
  MAIN_STACK: undefined;
  HOME_STACK: undefined;
  CATEGORIES_STACK: undefined | { screen: string; params?: any };
  USER_STACK: undefined;
  SEARCH_STACK: undefined;
  PRODUCT_STACK: undefined | { screen: string; params?: any };
  SETTING_STACK: undefined;
  POKEMON_INFO_STACK: undefined | { screen: string; params?: any };
  SPLASH: undefined;
};
export type {
  ProductStackParamList,
  CategoriesStackParamList,
  SettingStackParamList,
  PokemonInfoStackParamList,
};

export type CombineStackParamList = RootStackParamList &
  CategoriesStackParamList &
  ProductStackParamList &
  SettingStackParamList &
  PokemonInfoStackParamList;
