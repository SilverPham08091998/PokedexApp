import { SafeAreaView, StyleSheet, View } from "react-native";
import { COLORS_LIGHT, GET_COLORS } from "@/theme";
import React from "react";
import { scale } from "react-native-utils-scale";
import { DEVICE_HEIGHT, useAppDispatch, useAppSelector } from "@/util";
import { CImage, CText, PaginationList } from "@/components";
import { Item } from "@/type";
import { ReduxAction } from "@/redux";

const SearchScreen = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => {
    return state.home;
  });
  const renderItem = (item: Item) => {
    return (
      <View style={styles.itemContainer}>
        <CImage url={item.sprites.default} style={styles.imageContainer} />
        <View style={styles.contentContainer}>
          <CText fontSize={16} fontWeight={"bold"} distanceBottom={scale(4)}>
            {item.name}
          </CText>
          <CText
            numberOfLines={5}
            color={COLORS_LIGHT.BLACK_3}
            ellipseMode={"tail"}
          >
            {item?.effect_entries.length > 0
              ? item.effect_entries[0].short_effect.replace(/[\n\f]/g, " ")
              : ""}
          </CText>
        </View>
      </View>
    );
  };
  const onPressPagination = (url: string) => {
    dispatch(ReduxAction.HOME_ACTION.getPokemonItem(url));
  };
  return (
    <SafeAreaView style={styles.container}>
      <PaginationList<Item>
        showsVerticalScrollIndicator={false}
        scrollEnabled={true}
        data={items}
        windowSize={DEVICE_HEIGHT * 3}
        removeClippedSubviews={true}
        renderItem={(item) => renderItem(item)}
        onPressPagination={(url) => {
          if (url) {
            onPressPagination(url);
          }
        }}
      />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GET_COLORS().BACKGROUND_GRAY,
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    marginHorizontal: scale(12),
    height: scale(60),
    alignItems: "center",
  },
  imageContainer: {
    width: scale(50),
    height: scale(50),
  },
  contentContainer: {
    marginLeft: scale(12),
    marginRight: scale(36),
  },
});
