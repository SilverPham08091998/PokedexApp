import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect } from "react";
import { COLORS_LIGHT, GET_COLORS } from "@/theme";
import { scale } from "react-native-utils-scale";
import { CHeader } from "@/components";
import { useAppDispatch, useAppSelector } from "@/util";
import { ReduxAction } from "@/redux";
import PokemonItem from "@/screens/HomeScreens/components/PokemonItem";

const HomeScreens = () => {
  const dispatch = useAppDispatch();
  const { listPokedex } = useAppSelector((state) => {
    return state.home;
  });
  useEffect(() => {
    dispatch(ReduxAction.HOME_ACTION.getPokedex(10));
    dispatch(ReduxAction.HOME_ACTION.getVersionPokemon());
  }, []);

  return (
    <View style={styles.container}>
      <CHeader title={"Home"} isShowBack={true} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={listPokedex}
        columnWrapperStyle={{ justifyContent: "space-around" }}
        numColumns={2}
        renderItem={({ item }) => {
          return <PokemonItem item={item} />;
        }}
        ItemSeparatorComponent={() => <View style={{ height: scale(12) }} />}
      />
    </View>
  );
};

export default HomeScreens;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GET_COLORS().BACKGROUND_GRAY,
    flex: 1,
  },
  line: {
    backgroundColor: COLORS_LIGHT.BACKGROUND_GRAY,
    width: "100%",
    height: scale(8),
    marginTop: scale(8),
  },
});
