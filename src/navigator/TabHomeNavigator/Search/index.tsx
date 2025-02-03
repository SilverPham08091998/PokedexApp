import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREEN_NAME } from "@/util/constants";
import { SearchScreen } from "@/screens";

const Stack = createNativeStackNavigator();

function SearchStack() {
  return (
    <Stack.Navigator
      initialRouteName={SCREEN_NAME.SEARCH}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={SCREEN_NAME.SEARCH} component={SearchScreen} />
    </Stack.Navigator>
  );
}

export default SearchStack;
