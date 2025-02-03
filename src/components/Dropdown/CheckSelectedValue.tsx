import { StyleSheet } from "react-native";
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
import React from "react";
import { COLORS_LIGHT, GET_COLORS, rgba } from "@/theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import { scale } from "react-native-utils-scale";
import { CText } from "@/components";
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";

interface Props {
  label: string;
  onPress: () => void;
  activeColor?: string;
  activeScale?: number;
  springConfig?: WithSpringConfig;
}

const CheckSelectedValue: React.FC<Props> = (props: Props) => {
  const scaleX = useSharedValue<number>(1);
  const {
    activeColor = COLORS_LIGHT.PRIMARY,
    label,
    onPress,
    activeScale = 0.5,
    springConfig = {
      damping: 15,
      mass: 0.2,
      stiffness: 150,
      overshootClamping: true,
      restSpeedThreshold: 0.0001,
      restDisplacementThreshold: 0.001,
    },
  } = props;

  const fadedActiveColor = rgba(activeColor, 0.1);
  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ scale: scaleX.value }],
      backgroundColor: fadedActiveColor,
      borderColor: activeColor,
    }),
    [scaleX]
  );
  const onGestureEvent =
    useAnimatedGestureHandler<TapGestureHandlerGestureEvent>(
      {
        onStart: () => {
          cancelAnimation(scaleX);
          scaleX.value = withDelay(100, withSpring(activeScale, springConfig));
        },
        onEnd: () => {
          runOnJS(onPress)();
        },
        onFinish: () => {
          cancelAnimation(scaleX);
          scaleX.value = withSpring(1, springConfig);
        },
      },
      [onPress]
    );

  return (
    <TapGestureHandler
      onGestureEvent={onGestureEvent}
      shouldCancelWhenOutside={true}
      numberOfTaps={1}
    >
      <Animated.View style={[styles.container, animatedStyle]}>
        <CText style={{ flexWrap: "wrap" }} color={activeColor} fontSize={14}>
          {label}
        </CText>
        <Animated.View
          style={{
            marginLeft: scale(8),
            justifyContent: "center",
            alignItems: "center",
            height: scale(20),
            width: scale(20),
          }}
        >
          <AntDesign
            name={"closecircle"}
            size={16}
            color={GET_COLORS().PRIMARY}
          />
        </Animated.View>
      </Animated.View>
    </TapGestureHandler>
  );
};

export default React.memo(CheckSelectedValue);

const styles = StyleSheet.create({
  container: {
    paddingVertical: scale(8),
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: scale(32),
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: scale(24),
    flexWrap: "nowrap",
  },
});
