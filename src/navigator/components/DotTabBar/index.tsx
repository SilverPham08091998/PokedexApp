import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { NavigationDot } from "./NavigationDot";
import { TabHandler } from "./TabHandler";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { COLORS_LIGHT, rgba } from "@/theme";
import { DEVICE_WIDTH } from "@/util";
import LinearGradient from "react-native-linear-gradient";
import { scale } from "react-native-utils-scale";

export const DotTabBar: FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
  insets,
}: BottomTabBarProps) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[
        rgba(COLORS_LIGHT.PRIMARY_LIGHT, 0.5),
        rgba(COLORS_LIGHT.PRIMARY, 0.05),
      ]}
      style={styles.container}
    >
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={[
          rgba(COLORS_LIGHT.PRIMARY_LIGHT, 0.5),
          rgba(COLORS_LIGHT.PRIMARY, 0.05),
        ]}
        style={{ height: scale(8) }}
      />
      <View style={{ flexDirection: "column" }}>
        <TabHandler
          state={state}
          descriptors={descriptors}
          navigation={navigation}
          insets={insets}
        />
        <NavigationDot
          width={DEVICE_WIDTH / state.routes.length}
          activeTabIndex={state.index}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: DEVICE_WIDTH,
    borderRadius: scale(12),
  },
});
