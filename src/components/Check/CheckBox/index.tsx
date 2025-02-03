import React, { useCallback, useLayoutEffect, useState } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { scale } from "react-native-utils-scale";
import { COLORS_LIGHT, IMAGE_URL } from "@/theme";
import Animated, {
  cancelAnimation,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  WithSpringConfig,
} from "react-native-reanimated";
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

interface Props {
  check?: boolean;
  size?: number;
  style?: ViewStyle;
  onPress?: any;
  type?: "checkbox" | "radio";
  disabled?: boolean;
}

const springConfig: WithSpringConfig = {
  damping: 15,
  mass: 0.2,
  stiffness: 150,
  overshootClamping: true,
  restSpeedThreshold: 0.0001,
  restDisplacementThreshold: 0.001,
};

const activeScale = 0.5;
const activeColor = COLORS_LIGHT.PRIMARY;

const CCheck: React.FC<Props> = (props) => {
  const {
    style,
    size = 24,
    type,
    check = false,
    onPress,
    disabled = false,
  } = props;
  const [active, setActive] = useState(false);
  const scaleX = useSharedValue<number>(1);

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: scaleX.value }],
      borderColor: activeColor,
    }),
    [scaleX]
  );
  const onGestureEvent =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
      {
        onStart: () => {
          cancelAnimation(scaleX);
          scaleX.value = withDelay(50, withSpring(activeScale, springConfig));
        },
        onEnd: () => {
          runOnJS(onPress)();
        },
        onFinish: () => {
          cancelAnimation(scaleX);
          scaleX.value = withSpring(1, springConfig);
        },
      },
      [onPress, check]
    );

  const getSource = useCallback(() => {
    if (type === "checkbox") {
      return active ? IMAGE_URL.checkBoxActive : IMAGE_URL.checkBoxInactive;
    } else {
      return active ? IMAGE_URL.radioActive : IMAGE_URL.radioInactive;
    }
  }, [type, active]);

  useLayoutEffect(() => {
    setActive(check);
  }, [check]);

  return (
    <TapGestureHandler
      onGestureEvent={onGestureEvent}
      shouldCancelWhenOutside={true}
      numberOfTaps={1}
      enabled={!disabled}
    >
      <Animated.View style={[styles.container, style, animatedStyle]}>
        <Animated.Image
          style={{
            width: scale(size),
            height: scale(size),
            tintColor: disabled ? "#c2cfe0" : undefined,
          }}
          source={getSource()}
          resizeMode="contain"
        />
      </Animated.View>
    </TapGestureHandler>
  );
};

export default React.memo(CCheck);

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: scale(30),
    height: scale(30),
    alignSelf: "center",
  },
});
