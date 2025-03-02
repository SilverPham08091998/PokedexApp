import { navigationRef, SCREEN_NAME } from "@/util/constants";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { REDUX_ACTION } from "@/redux";
import NetInfo from "@react-native-community/netinfo";
import { useAppDispatch } from "@/util";
import { RootStackParamList } from "@/navigator/Routes";
import {
  ItemsScreen,
  MoveInfoScreen,
  PokemonInfoScreen,
  PokemonsScreens,
  SplashScreen,
  TypeInfoScreen,
  TypesScreen,
} from "@/screens";
import TabHomeNavigator from "@/navigator/TabHomeNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

const Navigator = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      dispatch({
        type: REDUX_ACTION.APP_STATE_ACTION.IS_CHECK_CONNECTED_INTERNET,
        payload: state.isConnected,
      });
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <NavigationContainer independent={true} ref={navigationRef}>
      <StatusBar backgroundColor={"transparent"} translucent />
      <Stack.Navigator
        initialRouteName={SCREEN_NAME.SPLASH}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name={SCREEN_NAME.SPLASH} component={SplashScreen} />
        <Stack.Screen name={SCREEN_NAME.MAIN} component={TabHomeNavigator} />

        <Stack.Screen name={SCREEN_NAME.MOVE_INFO} component={MoveInfoScreen} />

        <Stack.Screen name={SCREEN_NAME.POKEMONS} component={PokemonsScreens} />
        <Stack.Screen name={SCREEN_NAME.TYPES} component={TypesScreen} />
        <Stack.Screen name={SCREEN_NAME.TYPE_INFO} component={TypeInfoScreen} />
        <Stack.Screen name={SCREEN_NAME.ITEMS} component={ItemsScreen} />
        <Stack.Screen
          name={SCREEN_NAME.POKEMON_INFO}
          component={PokemonInfoScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
