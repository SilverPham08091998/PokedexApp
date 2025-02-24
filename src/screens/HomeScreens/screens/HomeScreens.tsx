import { SafeAreaView, StyleSheet } from "react-native";
import React from "react";
import { COLORS_LIGHT, GET_COLORS } from "@/theme";
import { scale } from "react-native-utils-scale";
import { useAppDispatch, useAppSelector } from "@/util";
import { CPokemonItem, PaginationList } from "@/components";
import { ReduxAction } from "@/redux";
import { PokemonInfo } from "@/type";

const HomeScreens = () => {
  const dispatch = useAppDispatch();
  const { listPokedex } = useAppSelector((state) => {
    return state.home;
  });

  const onPressButtonPagination = (url: string) => {
    dispatch(ReduxAction.HOME_ACTION.getPokedex(url));
  };

  return (
    <SafeAreaView style={styles.container}>
      <PaginationList<PokemonInfo>
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        style={{ flex: 1 }}
        data={listPokedex}
        columnWrapperStyle={{ justifyContent: "space-around" }}
        numColumns={2}
        renderItem={(item) => {
          return <CPokemonItem item={item} />;
        }}
        onPressPagination={(url) => {
          if (url) {
            onPressButtonPagination(url);
          }
        }}
      />
    </SafeAreaView>
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
