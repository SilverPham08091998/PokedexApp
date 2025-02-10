import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { scale } from "react-native-utils-scale";
import { STRING_CONVERTER } from "@/util/function";
import { COLORS_LIGHT } from "@/theme";
import { PokemonVersionColors, ResourceLink } from "@/type";
import { MORE_ITEM } from "@/screens/PokemonInfoScreen/constants";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SPRING_CONFIG = {
  duration: 1200,
  overshootClamping: true,
  dampingRatio: 0.8,
};

interface FloatingActionButtonProps {
  isExpanded: SharedValue<boolean>;
  index: number;
  versionName: string;
  totalButtons: number;
  onPressAction: (indexVersion: number, version: string) => void;
}

const FloatingActionButton = ({
  isExpanded,
  index,
  totalButtons,
  versionName,
  onPressAction,
}: FloatingActionButtonProps) => {
  const radius = 70; // Khoảng cách cố định từ tâm
  const centerX = 0; // Tọa độ X của tâm
  const centerY = 0; // Tọa độ Y của tâm
  const colorVersion =
    PokemonVersionColors[versionName.toUpperCase()] || COLORS_LIGHT.BLACK_4;
  const animatedStyles = useAnimatedStyle(() => {
    // Chia đều góc trong khoảng -90° đến 90° (bên trái trục tung)
    const angle = Math.PI / 2 + (index * Math.PI) / (totalButtons - 1);

    // Tính vị trí X, Y sao cho luôn cách tâm một khoảng `radius`
    const targetX = centerX + radius * Math.cos(angle); // Luôn bên trái
    const targetY = centerY + radius * Math.sin(angle); // Trên hoặc dưới

    // Hiệu ứng di chuyển khi mở rộng hoặc thu gọn
    const translateX = withSpring(
      isExpanded.value ? targetX : 0,
      SPRING_CONFIG
    );
    const translateY = withSpring(
      isExpanded.value ? targetY : 0,
      SPRING_CONFIG
    );

    const delay = index * 100;
    const scaleValue = isExpanded.value ? 1 : 0;

    return {
      transform: [
        { translateX },
        { translateY },
        {
          scale: withDelay(delay, withTiming(scaleValue)),
        },
      ],
    };
  });

  return (
    <AnimatedPressable
      key={index}
      onPress={() => onPressAction(index, versionName)}
      style={[
        animatedStyles,
        styles.shadow,
        styles.button,
        { backgroundColor: colorVersion },
      ]}
    >
      <Animated.Text style={styles.content}>
        {versionName === MORE_ITEM.name
          ? versionName
          : STRING_CONVERTER.formatVersion(versionName)}
      </Animated.Text>
    </AnimatedPressable>
  );
};

interface FloatingActionGroupsProps {
  groups: [ResourceLink?, ResourceLink?, ResourceLink?];
  onPressAction: (index: number, versionName: string) => void;
}

const FloatingActionGroups = (props: FloatingActionGroupsProps) => {
  const { groups, onPressAction } = props;
  const isExpanded = useSharedValue(false);

  const handlePress = () => {
    isExpanded.value = !isExpanded.value;
  };

  const plusIconStyle = useAnimatedStyle(() => {
    const moveValue = interpolate(Number(isExpanded.value), [0, 1], [0, 2]);
    const translateValue = withTiming(moveValue);
    const rotateValue = isExpanded.value ? "45deg" : "0deg";

    return {
      transform: [
        { translateX: translateValue },
        { rotate: withTiming(rotateValue) },
      ],
    };
  });
  return (
    <View style={styles.mainContainer}>
      <View style={styles.buttonContainer}>
        <AnimatedPressable
          onPress={handlePress}
          style={[styles.shadow, styles.mainButtonContainer]}
        >
          <Animated.Text style={[plusIconStyle, styles.mainContent]}>
            +
          </Animated.Text>
        </AnimatedPressable>
        {groups
          .concat([MORE_ITEM])
          .reverse()
          .map((item?: ResourceLink, index?: number) => {
            if (item) {
              return (
                <FloatingActionButton
                  key={index}
                  isExpanded={isExpanded}
                  index={index || 0}
                  totalButtons={4}
                  versionName={item.name}
                  onPressAction={(indexVersion, version) => {
                    isExpanded.value = false;
                    onPressAction(indexVersion, version);
                  }}
                />
              );
            }
          })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    position: "absolute",
    zIndex: 3,
    bottom: scale(120),
    right: scale(60),
    display: "flex",
  },
  button: {
    width: scale(50),
    height: scale(50),
    position: "absolute",
    borderRadius: scale(100),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: -2,
    flexDirection: "row",
    padding: scale(4),
  },
  buttonContainer: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  shadow: {
    shadowColor: "#171717",
    shadowOffset: { width: -0.5, height: 3.5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  content: {
    color: COLORS_LIGHT.WHITE,
    fontWeight: "700",
    fontSize: 12,
  },
  mainButtonContainer: {
    zIndex: 1,
    height: scale(60),
    width: scale(60),
    borderRadius: 100,
    backgroundColor: COLORS_LIGHT.PRIMARY,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mainContent: {
    fontSize: 24,
    color: "#f8f9ff",
  },
});

export default FloatingActionGroups;
