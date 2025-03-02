import { SafeAreaView, StyleSheet, View } from "react-native";
import React, { useRef } from "react";
import { COLORS_LIGHT, GET_COLORS } from "@/theme";
import { scale } from "react-native-utils-scale";
import {
  NAVIGATION,
  SCREEN_NAME,
  useAppDispatch,
  useAppSelector,
} from "@/util";
import { CHeader, PaginationList } from "@/components";
import { ReduxAction } from "@/redux";
import { PokemonInfo } from "@/type";
import PokemonRowItem from "@/components/Pokemon/PokemonRowItem";

const HomeScreens = () => {
  const dispatch = useAppDispatch();
  const { listPokedex } = useAppSelector((state) => {
    return state.home;
  });

  const onPressButtonPagination = (url: string) => {
    dispatch(ReduxAction.HOME_ACTION.getPokedex(url));
  };
  const isScrolling = useRef(false);

  return (
    <View style={{ flex: 1 }}>
      <CHeader title={"Pokemon"} />
      <SafeAreaView style={styles.container}>
        <PaginationList<PokemonInfo>
          showsVerticalScrollIndicator={false}
          scrollEnabled={true}
          data={listPokedex}
          onScrollBeginDrag={() => (isScrolling.current = true)}
          onMomentumScrollEnd={() => (isScrolling.current = false)}
          renderItem={(item, index) => {
            return (
              <PokemonRowItem
                index={index}
                item={item}
                onPressItem={(i) => {
                  if (!isScrolling.current) {
                    console.log("onPress Item", i.name);
                    NAVIGATION.navigate(SCREEN_NAME.POKEMON_INFO, {
                      pokemon: i,
                    });
                  }
                }}
              />
            );
          }}
          keyboardShouldPersistTaps={"always"}
          onPressPagination={(url) => {
            if (url) {
              onPressButtonPagination(url);
            }
          }}
          renderItemSeparatorComponent={() => <View style={styles.line} />}
        />
      </SafeAreaView>
    </View>
  );
};

export default HomeScreens;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GET_COLORS().WHITE,
    flex: 1,
  },
  line: {
    backgroundColor: COLORS_LIGHT.BACKGROUND_GRAY,
    width: "100%",
    height: scale(1),
    marginTop: scale(8),
  },
});
