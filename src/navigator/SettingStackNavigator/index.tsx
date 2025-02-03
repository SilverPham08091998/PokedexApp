import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SCREEN_NAME } from "@/util/constants";
import { SettingScreen } from "@/screens";

const Stack = createNativeStackNavigator();

function SettingStack() {
  return (
    <Stack.Navigator
      initialRouteName={SCREEN_NAME.SETTING}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={SCREEN_NAME.SETTING} component={SettingScreen} />
    </Stack.Navigator>
  );
}

export default SettingStack;
