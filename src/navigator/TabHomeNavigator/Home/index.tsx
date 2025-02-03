import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREEN_NAME } from "@/util/constants";
import { HomeScreens } from "@/screens";

const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName={SCREEN_NAME.HOME}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={SCREEN_NAME.HOME} component={HomeScreens} />
    </Stack.Navigator>
  );
}

export default HomeStack;
