import React from "react";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { SCREEN_NAME } from "@/util/constants";
import { ItemsScreen, PokemonsScreens, TypesScreen } from "@/screens";
import { DotTabBar } from "@/navigator/components/DotTabBar";

const BottomTab = createBottomTabNavigator();

const TabHomeNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props: BottomTabBarProps) => <DotTabBar {...props} />}
    >
      <BottomTab.Screen
        options={{
          title: "Pokemon",
        }}
        name={SCREEN_NAME.POKEMONS}
        component={PokemonsScreens}
      />
      <BottomTab.Screen
        options={{
          title: "Moves",
        }}
        name={SCREEN_NAME.MOVES}
        component={TypesScreen}
      />

      <BottomTab.Screen
        options={{
          title: "Types",
        }}
        name={SCREEN_NAME.TYPES}
        component={TypesScreen}
      />
      <BottomTab.Screen
        options={{
          title: "Items",
        }}
        name={SCREEN_NAME.ITEMS}
        component={ItemsScreen}
      />
    </BottomTab.Navigator>
  );
};

export default TabHomeNavigator;
