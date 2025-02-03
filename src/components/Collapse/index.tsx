import * as React from "react";
import { FC, useCallback, useRef, useState } from "react";
import {
  Animated,
  Easing,
  StyleProp,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import { GET_COLORS, TYPE } from "@/theme";
import { fontScale, scale } from "react-native-utils-scale";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

interface Props {
  title?: string;
  showSeeMore?: boolean;
  customRender?: React.ReactNode | null;
  renderIconHide?: React.ReactNode | null;
  renderIconShow?: React.ReactNode | null;
  height?: number;
  style?: StyleProp<ViewStyle>;
}

const Collapse: FC<Props> = React.memo(
  ({
    showSeeMore = true,
    title,
    customRender,
    height = 0,
    style,
    renderIconHide,
    renderIconShow,
  }) => {
    const [show, setShow] = useState<boolean>(false);
    const animatedHeightChild = useRef<Animated.Value>(
      new Animated.Value(0)
    ).current;
    const maxHeight = animatedHeightChild.interpolate({
      inputRange: [0, 1],
      outputRange: [0, height],
    });
    const rotate = animatedHeightChild.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "180deg"],
      easing: Easing.linear,
    });

    const _handleClick = useCallback(() => {
      Animated.timing(animatedHeightChild, {
        toValue: show ? 0 : 1,
        duration: 500,
        useNativeDriver: false,
        easing: Easing.linear,
      }).start(() => {
        setShow(!show);
      });
    }, [show]);

    const _renderChildComponent = useCallback(() => {
      if (!customRender) {
        return null;
      }
      return customRender;
    }, [customRender]);
    const _renderButtonShow = () => {
      if (showSeeMore) {
        if (renderIconHide && renderIconShow) {
          return <View>{show ? renderIconShow : renderIconHide}</View>;
        }
        return (
          <Animated.View
            style={[styles.buttonMore, { transform: [{ rotate }] }]}
          >
            <MaterialIcon
              name="chevron-up"
              size={24}
              color={GET_COLORS().BLACK_4}
            />
          </Animated.View>
        );
      }
      return <View />;
    };
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableWithoutFeedback
          disabled={!showSeeMore}
          onPress={_handleClick}
        >
          <View
            style={[
              { flexDirection: "row", marginHorizontal: scale(24) },
              style,
            ]}
          >
            <Text style={styles.title}>{title}</Text>
            {_renderButtonShow()}
          </View>
        </TouchableWithoutFeedback>
        <Animated.View style={[{ height: maxHeight }]}>
          {_renderChildComponent()}
        </Animated.View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  buttonMore: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    color: GET_COLORS().PRIMARY,
    fontFamily: TYPE.BOLD,
    fontWeight: "700",
    fontSize: fontScale(18),
    flex: 1,
  },
  textContent: {
    fontSize: fontScale(18),
    fontFamily: TYPE.SEMI_BOLD,
    fontWeight: "600",
  },
});
export default Collapse;
