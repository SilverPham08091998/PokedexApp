import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { ButtonMaskedView, CPokemonEffective } from "@/components";
import { COLORS_LIGHT, GET_COLORS } from "@/theme";
import React, { useState } from "react";
import {
  DEVICE_WIDTH,
  NAVIGATION,
  SCREEN_NAME,
  useAppDispatch,
  useAppSelector,
} from "@/util";
import { scale } from "react-native-utils-scale";
import { ReduxAction } from "@/redux";

enum EFFECT {
  SUPER = "SUPER",
  WEAK = "WEAK",
  NONE = "NONE",
}

const TypesScreen = () => {
  const dispatch = useAppDispatch();
  const { types } = useAppSelector((state) => {
    return state.home;
  });
  const [value, setValue] = useState<string>(EFFECT.SUPER + "");

  return (
    <SafeAreaView style={styles.container}>
      <ButtonMaskedView
        data={[
          { label: "Super-effective", value: EFFECT.SUPER },
          { label: "Weak-effective", value: EFFECT.WEAK },
          { label: "No-effect", value: EFFECT.NONE },
        ]}
        widthTab={(DEVICE_WIDTH - 24) / 3}
        defaultValue={{ label: "Tổng tiền đơn hàng", value: value }}
        onPress={(item) => {
          setTimeout(() => {
            setValue(item?.value + "");
          }, 10);
        }}
      />
      <FlatList
        data={types}
        renderItem={({ item }) => {
          return (
            <CPokemonEffective
              type={item}
              effectiveType={value}
              onPressType={(i) => {
                dispatch(
                  ReduxAction.HOME_ACTION.getTypeInfo(i, () => {
                    NAVIGATION.navigate(SCREEN_NAME.TYPE_INFO, {
                      type: item,
                    });
                  })
                );
              }}
            />
          );
        }}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        ListHeaderComponent={() => <View style={{ height: scale(8) }} />}
        ListFooterComponent={() => <View style={{ height: scale(8) }} />}
      />
    </SafeAreaView>
  );
};

export default TypesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GET_COLORS()?.WHITE,
  },
  itemSeparator: {
    height: scale(2),
    backgroundColor: COLORS_LIGHT.LINE,
    marginVertical: scale(6),
    marginHorizontal: scale(12),
  },
  wrapperContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: scale(4),
    marginVertical: scale(8),
    flex: 1,
  },
  typeSize: {
    height: scale(20),
    width: scale(80),
  },
});
