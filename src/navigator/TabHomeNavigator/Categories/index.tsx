import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CategoriesScreen, SubCategoriesDetailScreen } from "@/screens";
import { SCREEN_NAME } from "@/util/constants";
import { CategoriesStackParamList } from "./CategoriesStackParamsList";

const Stack = createNativeStackNavigator<CategoriesStackParamList>();

function CategoriesStack() {
  return (
    <Stack.Navigator
      initialRouteName={SCREEN_NAME.CATEGORIES}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name={SCREEN_NAME.CATEGORIES}
        component={CategoriesScreen}
      />
      <Stack.Screen
        name={SCREEN_NAME.SUB_CATEGORIES_DETAIL}
        component={SubCategoriesDetailScreen}
      />
    </Stack.Navigator>
  );
}

export default CategoriesStack;
