import React, { useRef, useState } from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { scale } from "react-native-utils-scale";
import { CText } from "../index";
import { GET_COLORS } from "@/theme";
import ReanimatedSwipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Ionicons from "react-native-vector-icons/Ionicons";
import Animated from "react-native-reanimated";

interface Props {
  styleContainer?: StyleProp<ViewStyle>;
  renderItemComponent: (pressed: boolean) => React.ReactNode;
  borderColor?: string;
  disabled?: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
  rightActions?: "delete" | "edit" | "both";
  onPressEdit?: () => void;
  onPressDelete?: () => void;
  renderRightAction?: () => React.ReactNode;
  renderLeftAction?: () => React.ReactNode;
  styleSwipeContainer?: StyleProp<ViewStyle>;
  showRightAction?: boolean;
  showLeftAction?: boolean;
  onPressLeftActions?: () => void;
}

const TouchableOpacityAnimation =
  Animated.createAnimatedComponent(TouchableOpacity);
const SwipeItemComponent: React.FC<Props> = (props) => {
  const {
    renderItemComponent,
    onPress,
    onLongPress,
    rightActions,
    onPressEdit,
    onPressDelete,
    renderLeftAction,
    renderRightAction,
    styleSwipeContainer = {},
    showRightAction = true,
    showLeftAction = true,
    onPressLeftActions,
  } = props;

  const swipeRef = useRef<any>(null);

  const [swiped, setSwiped] = useState<boolean>(false);

  const renderRightActions = () => {
    if (!showRightAction) {
      return null;
    }

    if (renderRightAction) {
      return renderRightAction();
    }
    return (
      <Animated.View style={{ flexDirection: "row" }}>
        {(rightActions === "delete" || rightActions === "both") && (
          <TouchableOpacityAnimation
            style={{
              ...styles.swipeButton,
              backgroundColor: GET_COLORS().RED,
            }}
            onPress={() => {
              swipeRef.current?.close();
              onPressDelete && onPressDelete();
            }}
          >
            <Ionicons name={"trash"} size={24} color={GET_COLORS().WHITE} />
          </TouchableOpacityAnimation>
        )}
        {(rightActions === "edit" || rightActions === "both") && (
          <TouchableOpacityAnimation
            style={{
              ...styles.swipeButton,
              backgroundColor: GET_COLORS().PRIMARY,
            }}
            onPress={() => {
              swipeRef.current?.close();
              onPressEdit && onPressEdit();
            }}
          >
            <Ionicons name={"pencil"} size={24} color={GET_COLORS().WHITE} />
          </TouchableOpacityAnimation>
        )}
      </Animated.View>
    );
  };
  const renderLeftActions = () => {
    if (!showLeftAction) {
      return null;
    }
    return (
      <TouchableOpacityAnimation
        style={{
          ...styles.swipeButton,
          backgroundColor: GET_COLORS().GREEN,
        }}
        onPress={() => {
          onPressLeftActions && onPressLeftActions();
          swipeRef.current?.close();
        }}
      >
        {renderLeftAction ? (
          renderLeftAction()
        ) : (
          <CText bold color={GET_COLORS().WHITE}>
            Archive
          </CText>
        )}
      </TouchableOpacityAnimation>
    );
  };
  return (
    <ReanimatedSwipeable
      ref={swipeRef}
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={100}
      leftThreshold={100}
      overshootFriction={10}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      containerStyle={[styles.swipeContainer, styleSwipeContainer]}
      onSwipeableClose={() => setSwiped(false)}
    >
      <Pressable
        disabled={swiped}
        delayLongPress={500}
        onPress={onPress}
        onLongPress={onLongPress}
      >
        {({ pressed }) => renderItemComponent(pressed)}
      </Pressable>
    </ReanimatedSwipeable>
  );
};

export default React.memo(SwipeItemComponent);

const styles = StyleSheet.create({
  swipeContainer: {
    borderTopRightRadius: scale(8),
    borderBottomRightRadius: scale(8),
    borderTopLeftRadius: scale(8),
    borderBottomLeftRadius: scale(8),
  },
  swipeButton: {
    width: scale(70),
    justifyContent: "center",
    alignItems: "center",
  },
});
