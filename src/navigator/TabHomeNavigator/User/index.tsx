import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREEN_NAME } from "@/util/constants";
import { UserScreens } from "@/screens";

const Stack = createNativeStackNavigator();

function UserStack() {
  return (
    <Stack.Navigator
      initialRouteName={SCREEN_NAME.USER}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={SCREEN_NAME.USER} component={UserScreens} />
    </Stack.Navigator>
  );
}

export default UserStack;
