import { StyleSheet, ViewStyle } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  Layout,
  useAnimatedStyle,
  withTiming,
  WithTimingConfig,
} from "react-native-reanimated";
import React from "react";
import { COLORS_LIGHT, GET_COLORS, rgba } from "@/theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import { scale } from "react-native-utils-scale";

interface Props {
  label: string;
  isChecked: boolean;
  onPress: () => void;
  activeColor?: string;
  inactiveColor?: string;
  timingConfig?: WithTimingConfig;
  icons?: "closecircle" | "checkcircle";
  containerStyle?: ViewStyle;
}

const CheckSelected: React.FC<Props> = (props: Props) => {
  const {
    activeColor = COLORS_LIGHT.PRIMARY,
    label,
    inactiveColor = COLORS_LIGHT.BLACK_4,
    isChecked,
    onPress,
    timingConfig = {
      duration: 150,
    },
    containerStyle = {},
    icons = "checkcircle",
  } = props;

  const fadedActiveColor = rgba(activeColor, 0.1);
  const rContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(
        isChecked ? fadedActiveColor : "transparent",
        timingConfig
      ),
      borderColor: withTiming(
        isChecked ? activeColor : inactiveColor,
        timingConfig
      ),
      paddingLeft: 12,
      paddingRight: !isChecked ? 12 : 8,
    };
  }, [isChecked]);

  const rTextStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(isChecked ? activeColor : inactiveColor, timingConfig),
    };
  }, [isChecked]);

  return (
    <Animated.View
      style={[styles.container, containerStyle, rContainerStyle]}
      onTouchEnd={onPress}
      layout={Layout.springify().mass(0.8)}
    >
      <Animated.Text style={[styles.label, rTextStyle]}>{label}</Animated.Text>
      {isChecked && (
        <Animated.View
          entering={FadeIn.duration(150)}
          exiting={FadeOut}
          style={{
            marginLeft: scale(8),
            justifyContent: "center",
            alignItems: "center",
            height: scale(20),
            width: scale(20),
          }}
        >
          <AntDesign name={icons} size={16} color={GET_COLORS().PRIMARY} />
        </Animated.View>
      )}
    </Animated.View>
  );
};

export default React.memo(CheckSelected);

const styles = StyleSheet.create({
  container: {
    paddingVertical: scale(8),
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: scale(30),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: scale(14),
    color: "#fff",
  },
});
