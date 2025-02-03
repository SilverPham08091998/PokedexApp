import { ProductStackParamList } from "./ProductStackNavigator/ProductStackParamList";
import { CategoriesStackParamList } from "./TabHomeNavigator/Categories/CategoriesStackParamsList";
import { SettingStackParamList } from "./SettingStackNavigator/SettingStackParamList";

export type RootStackParamList = {
  MAIN_STACK: undefined;
  HOME_STACK: undefined;
  CATEGORIES_STACK: undefined;
  USER_STACK: undefined;
  SEARCH_STACK: undefined;
  PRODUCT_STACK: undefined | { screen: string; params?: any };
  SETTING_STACK: undefined;
};
export type {
  ProductStackParamList,
  CategoriesStackParamList,
  SettingStackParamList,
};

export type CombineStackParamList = RootStackParamList &
  ProductStackParamList &
  SettingStackParamList;
