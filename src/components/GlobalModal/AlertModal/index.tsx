import React, {
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  Animated,
  Easing,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { scale } from "react-native-utils-scale";
import Ionicons from "react-native-vector-icons/Ionicons";
import { GET_COLORS } from "@/theme";
import { CText } from "@/components";

export const globalAlertRef = React.createRef<any>();

interface GlobalAlertState {
  title: string;
  content: string;
  action?: () => void;
}

export const globalAlert = {
  show: (value: GlobalAlertState) => {
    globalAlertRef?.current?.show(value);
  },
};
const GlobalAlert = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [data, setData] = useState<GlobalAlertState>({
    title: "Warning",
    content: "You call Charles Chapo. Would you like to log it ?",
  });
  useImperativeHandle(ref, () => {
    return { show: show };
  });

  const show = (value: GlobalAlertState) => {
    setVisible(true);
    setData(value);
    showAlert();
  };
  const { content = "Thêm vào giỏ hàng thành công" } = data;

  const animateValue = useRef<Animated.Value>(new Animated.Value(0)).current;
  const bottom = animateValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [-100, 0, 100],
  });
  const rotate = animateValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ["0deg", "180deg", "360deg"],
    easing: Easing.linear,
  });

  const showAlert = useCallback(() => {
    Animated.timing(animateValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start(() => {
      setTimeout(() => {
        hide();
      }, 2000);
    });
  }, [visible]);

  const hide = useCallback(() => {
    Animated.timing(animateValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
      easing: Easing.linear,
    }).start(() => {
      setVisible(false);
    });
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View style={[styles.container, { bottom: bottom }]}>
      <Animated.View style={{ transform: [{ rotateY: rotate }] }}>
        <Ionicons
          name={visible ? "checkmark-circle" : "radio-button-off"}
          size={scale(24)}
          color={GET_COLORS().WHITE}
        />
      </Animated.View>

      <CText style={{ flex: 1, marginHorizontal: scale(4) }}>{content}</CText>
      <View
        style={{
          width: scale(2),
          height: "90%",
          backgroundColor: GET_COLORS().WHITE,
          marginRight: scale(12),
        }}
      />
      <TouchableOpacity
        onPress={() => {
          hide();
        }}
      >
        <Ionicons name={"close"} size={scale(24)} color={GET_COLORS().WHITE} />
      </TouchableOpacity>
    </Animated.View>
  );
});

export default GlobalAlert;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    flexDirection: "row",
    backgroundColor: GET_COLORS().GREEN,
    alignItems: "center",
    paddingHorizontal: scale(12),
    borderRadius: scale(4),
    paddingVertical: scale(8),
    marginHorizontal: scale(12),
  },
});
