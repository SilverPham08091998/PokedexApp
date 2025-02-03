import React, { FC, useMemo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { NavigationState } from "@react-navigation/native";

import { NavigationDot } from "./NavigationDot";
import { TabHandler } from "./TabHandler";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { GET_COLORS } from "@/theme";

type TabsUiProps = {
  tabs: {
    name: string;
  }[];
  state: NavigationState;

  bottomBarProps: BottomTabBarProps;
};

const { width: windowWidth } = Dimensions.get("window");

export const DotTabBar: FC<TabsUiProps> = ({ tabs, state, bottomBarProps }) => {
  const tabWidth = useMemo(() => windowWidth / tabs.length, [tabs.length]);
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "column" }}>
        <TabHandler
          tabs={tabs}
          tabWidth={tabWidth}
          activeTabIndex={state.index}
          bottomBarProps={bottomBarProps}
        />
        <NavigationDot width={tabWidth} activeTabIndex={state.index} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    backgroundColor: GET_COLORS().BACKGROUND_GRAY,
  },
});
