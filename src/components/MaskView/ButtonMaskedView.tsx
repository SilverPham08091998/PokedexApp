import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { scale } from "react-native-utils-scale";
import { CText } from "@/components";
import { GET_COLORS } from "@/theme";
import React, { useLayoutEffect, useState } from "react";
import Animated, {
  Easing,
  Layout,
  runOnJS,
  useAnimatedStyle,
  withTiming,
  WithTimingConfig,
} from "react-native-reanimated";
import MaskedView from "@react-native-masked-view/masked-view";
import { BaseOption } from "@/type";

const MaskedViewAnimation = Animated.createAnimatedComponent(MaskedView);

interface Props {
  heightTab?: number;
  widthTab?: number;
  onPress?: (item: BaseOption) => void;
  data: Array<BaseOption>;
  timingConfig?: WithTimingConfig;
  defaultValue?: BaseOption;
  borderTab?: number;
  activeColor?: string;
  inActiveColor?: string;
}

const ButtonMaskedView = (props: Props) => {
  const [value, setValue] = useState<number>(0);
  const {
    heightTab = 40,
    widthTab = 100,
    borderTab = 8,
    onPress,
    data,
    timingConfig = {
      duration: 500,
      easing: Easing.inOut(Easing.quad),
    },
    defaultValue,
    inActiveColor = GET_COLORS().BLACK_4,
    activeColor = GET_COLORS().PRIMARY,
  } = props;

  useLayoutEffect(() => {
    if (defaultValue) {
      const findIndex = data.findIndex((i) => i.value === defaultValue.value);
      setValue(findIndex === -1 ? 0 : findIndex);
    }
  }, [defaultValue]);

  const tabBar = (color: string) => {
    return (
      <View>
        <FlatList
          data={data}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          renderItem={({ item, index }) => {
            const firstItemStyle =
              index === 0
                ? {
                    borderBottomLeftRadius: borderTab,
                    borderTopLeftRadius: borderTab,
                  }
                : {};
            const lastItemStyle =
              index === data.length - 1
                ? {
                    borderBottomRightRadius: borderTab,
                    borderTopRightRadius: borderTab,
                  }
                : {};
            return (
              <Pressable
                onPress={() => {
                  setValue(index);
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor: color,
                    width: widthTab,
                    height: heightTab,
                    alignItems: "center",
                    justifyContent: "center",
                    ...firstItemStyle,
                    ...lastItemStyle,
                  }}
                >
                  <CText
                    textAlign={"center"}
                    color={GET_COLORS().WHITE}
                    fontWeight={"bold"}
                  >
                    {item.label}
                  </CText>
                </View>
              </Pressable>
            );
          }}
        />
      </View>
    );
  };

  const animateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(value * widthTab, timingConfig, (finished) => {
            if (onPress && finished) {
              runOnJS(onPress)(data[value]);
            }
          }),
        },
      ],
    };
  }, [value]);

  return (
    <View>
      {tabBar(inActiveColor)}
      <MaskedViewAnimation
        style={styles.maskContainer}
        layout={Layout.springify().mass(0.8)}
        maskElement={
          <Animated.View
            style={[
              {
                backgroundColor: GET_COLORS().WHITE,
                width: widthTab,
                height: heightTab,
                borderRadius: borderTab,
              },
              animateStyle,
            ]}
          />
        }
      >
        {tabBar(activeColor)}
      </MaskedViewAnimation>
    </View>
  );
};

export default React.memo(ButtonMaskedView);

const styles = StyleSheet.create({
  container: {},
  separator: {
    width: scale(1),
    backgroundColor: "#DEDEDF",
    height: scale(40),
  },
  maskContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
