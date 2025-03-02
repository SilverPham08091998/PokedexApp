import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { scale } from "react-native-utils-scale";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { COLORS_LIGHT, IMAGE_URL } from "@/theme";
import { DEVICE_WIDTH, SCREEN_NAME } from "@/util";
import { CImage, CText } from "@/components";

export const TabHandler: FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) => {
  const getResourceTab = (screen: string) => {
    switch (screen) {
      case SCREEN_NAME.POKEMONS:
        return IMAGE_URL.tab_pokemons;
      case SCREEN_NAME.MOVES:
        return IMAGE_URL.tab_moves;
      case SCREEN_NAME.ITEMS:
        return IMAGE_URL.tab_items;
      case SCREEN_NAME.TYPES:
        return IMAGE_URL.tab_items;
    }
  };
  return (
    <View style={{ flexDirection: "row" }}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        return (
          <TouchableOpacity
            key={index}
            style={{
              ...styles.container,
              width: DEVICE_WIDTH / state.routes.length,
            }}
            onPress={() => navigation.navigate(route.name)}
          >
            <CImage
              style={styles.imageIcon}
              source={getResourceTab(route.name)}
              tintColor={isFocused ? COLORS_LIGHT.PRIMARY : "#CCCCCC"}
            />
            <CText
              color={isFocused ? COLORS_LIGHT.PRIMARY : "#CCCCCC"}
              fontWeight={"700"}
              fontSize={10}
              distanceTop={4}
            >
              {label}
            </CText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scale(62),
    alignItems: "center",
    justifyContent: "center",
  },

  imageIcon: {
    width: scale(24),
    height: scale(24),
  },
});
