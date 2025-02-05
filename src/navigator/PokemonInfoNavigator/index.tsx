import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PokemonInfoScreen } from "@/screens";
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
    </Stack.Navigator>
  );
};

export default PokemonInfoStack;
