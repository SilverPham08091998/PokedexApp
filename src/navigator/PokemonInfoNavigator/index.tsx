import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MoveInfoScreen, PokemonInfoScreen } from "@/screens";
import { SCREEN_NAME } from "@/util/constants";
import { PokemonInfoStackParamList } from "@/navigator/PokemonInfoNavigator/PokemonInfoStackParamList";

const Stack = createNativeStackNavigator<PokemonInfoStackParamList>();

const PokemonInfoStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREEN_NAME.POKEMON_INFO}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name={SCREEN_NAME.POKEMON_INFO}
        component={PokemonInfoScreen}
      />
      <Stack.Screen name={SCREEN_NAME.MOVE_INFO} component={MoveInfoScreen} />
    </Stack.Navigator>
  );
};

export default PokemonInfoStack;
