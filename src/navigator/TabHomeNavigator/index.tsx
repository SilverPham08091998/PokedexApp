import React from "react";
import {
  BottomTabBarProps,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import { SCREEN_NAME } from "@/util/constants";
import { DotTabBar } from "./components";
import {
  CategoriesScreen,
  HomeScreens,
  SearchScreen,
  UserScreens,
} from "@/screens";

const BottomTab = createBottomTabNavigator();

const EmptyComponent = () => null;
const tabs = [
  {
    name: SCREEN_NAME.HOME,
  },
  { name: SCREEN_NAME.CATEGORIES },
  { name: "Optional" },
  { name: SCREEN_NAME.SEARCH },
  { name: SCREEN_NAME.USER },
];

const BottomTabHome = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props: BottomTabBarProps) => (
        <DotTabBar tabs={tabs} state={props.state} bottomBarProps={props} />
      )}
    >
      <BottomTab.Screen
        options={{
          title: "Trang chủ",
        }}
        name={SCREEN_NAME.HOME}
        component={HomeScreens}
      />
      <BottomTab.Screen
        options={{
          title: "Danh mục",
        }}
        name={SCREEN_NAME.CATEGORIES}
        component={CategoriesScreen}
      />
      <BottomTab.Screen name={"Optional"} component={EmptyComponent} />

      <BottomTab.Screen
        options={{
          title: "Tìm kiếm",
        }}
        name={SCREEN_NAME.SEARCH}
        component={SearchScreen}
      />
      <BottomTab.Screen
        options={{
          title: "Tài khoản",
        }}
        name={SCREEN_NAME.USER}
        component={UserScreens}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabHome;
