import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { scale } from "react-native-utils-scale";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Svg, { Path } from "react-native-svg";
import { DEVICE_WIDTH, NAVIGATION, SCREEN_NAME } from "@/util/constants";
import { getPathDown } from "./path";
import { TabIcon } from "./TabIcon";
import { GET_COLORS } from "@/theme";
import { AddButton } from "./AddButton";

type TabHandlerProps = {
  tabs: {
    name: string;
  }[];
  tabWidth: number;
  activeTabIndex: number;
  bottomBarProps: BottomTabBarProps;
};

export const TabHandler: FC<TabHandlerProps> = ({
  tabs,
  tabWidth,
  activeTabIndex,
  bottomBarProps,
}) => {
  const d = getPathDown(DEVICE_WIDTH, 62, 52, true);
  return (
    <View>
      <Svg width={DEVICE_WIDTH} height={60}>
        <Path fill={"white"} {...{ d: d }} />
      </Svg>
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          left: 0,
          right: 0,
        }}
      >
        {tabs.map((tab: any, index: number) => {
          const onPress = () => {
            if (tab.name === "Optional") {
              NAVIGATION.navigate(
                SCREEN_NAME.PRODUCT_STACK,
                SCREEN_NAME.PRODUCT,
                {
                  userId: "Silver",
                  count: 1,
                }
              );
            } else {
              bottomBarProps.navigation.navigate(tab.name);
            }
          };
          if (tab.name === "Optional") {
            return (
              <View
                key={index}
                style={{ flex: 1, backgroundColor: GET_COLORS().TRANSPARENT }}
              >
                <AddButton onPress={onPress} />
              </View>
            );
          }
          return (
            <View key={index} style={{ ...styles.container, width: tabWidth }}>
              <TouchableOpacity onPress={onPress} style={styles.button}>
                <TabIcon
                  tab={tab.name}
                  routeName={tabs[activeTabIndex].name}
                  fillActive={GET_COLORS().PRIMARY}
                  fillInactive={GET_COLORS().LINE_2}
                />
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: scale(62),
    alignItems: "center",
    flexDirection: "column",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
});
