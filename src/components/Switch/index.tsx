import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";
import { GET_COLORS } from "@/theme";

interface Props {
  handleOnPress: (val: boolean) => void;
  value: boolean;
  activeTrackColor?: string;
  inActiveTrackColor?: string;
  thumbColor?: string;
  disable?: boolean;
}

const ComponentSwitch = (props: Props) => {
  const {
    handleOnPress,
    value,
    activeTrackColor = props.disable
      ? GET_COLORS().GRAY_1
      : GET_COLORS().PRIMARY,
    inActiveTrackColor = GET_COLORS().TEXT_LINE,
    thumbColor = GET_COLORS().WHITE,
    disable,
  } = props;
  const switchTranslate = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (value) {
      Animated.spring(switchTranslate, {
        toValue: 22,
        mass: 1,
        damping: 15,
        stiffness: 120,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.spring(switchTranslate, {
        toValue: 0,
        mass: 1,
        damping: 15,
        stiffness: 120,
        overshootClamping: false,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
        useNativeDriver: false,
      }).start();
    }
  }, [value, switchTranslate]);
  const interpolateBackgroundColor = switchTranslate.interpolate({
    inputRange: [0, 22],
    outputRange: [inActiveTrackColor, activeTrackColor],
  });

  const memoizedOnSwitchPressCallback = React.useCallback(() => {
    handleOnPress(!value);
  }, [handleOnPress, value]);

  return (
    <Pressable onPress={memoizedOnSwitchPressCallback} disabled={disable}>
      <Animated.View
        style={[
          styles.containerStyle,
          { backgroundColor: interpolateBackgroundColor },
        ]}
      >
        <Animated.View
          style={[
            styles.circleStyle,
            { backgroundColor: thumbColor },
            {
              transform: [
                {
                  translateX: switchTranslate,
                },
              ],
            },
            styles.shadowValue,
          ]}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  circleStyle: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  containerStyle: {
    width: 48,
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 36.5,
  },
  shadowValue: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
});

export default ComponentSwitch;
