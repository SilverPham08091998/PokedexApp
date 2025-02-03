import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { scale } from "react-native-utils-scale";
import { CText } from "..";
import { COLORS_LIGHT, GET_COLORS, rgba } from "@/theme";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FeatherIcon from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";

interface Props {
  title: string;
  isShowBack?: boolean;
  onBack?: () => void;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  onPressCart?: () => void;
  onPressCancel?: () => void;
  onPressMore?: () => void;
}

const CHeader: React.FC<Props> = (props) => {
  const { goBack } = useNavigation();
  const {
    title = "Default",
    titleStyle = {},
    onBack,
    containerStyle = {},
    isShowBack = true,
    onPressCart,
    onPressCancel,
    onPressMore,
  } = props;

  return (
    <View style={{ ...containerStyle, ...styles.container }}>
      {isShowBack && (
        <TouchableOpacity onPress={() => (onBack ? onBack : goBack())}>
          <MaterialIcon name={"keyboard-arrow-left"} size={scale(24)} />
        </TouchableOpacity>
      )}
      <CText
        fontWeight={"700"}
        fontSize={18}
        style={{
          ...titleStyle,
          flex: 1,
          paddingHorizontal: scale(isShowBack ? 4 : 0),
        }}
      >
        {title}
      </CText>
      <TouchableOpacity onPress={() => onPressCart && onPressCart()}>
        <FeatherIcon
          name={"shopping-cart"}
          size={scale(24)}
          color={COLORS_LIGHT.BLACK_1}
        />
      </TouchableOpacity>

      <View style={styles.button}>
        <TouchableOpacity onPress={() => onPressMore && onPressMore()}>
          <MaterialIcon
            name={"more-horiz"}
            size={scale(16)}
            color={COLORS_LIGHT.BLACK_1}
          />
        </TouchableOpacity>
        <View style={styles.line} />
        <TouchableOpacity onPress={() => onPressCancel && onPressCancel()}>
          <Ionicons
            name={"close-circle-outline"}
            size={scale(16)}
            color={COLORS_LIGHT.BLACK_1}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default React.memo(CHeader);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(16),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: scale(12),
  },
  button: {
    flexDirection: "row",
    backgroundColor: rgba(GET_COLORS().BLACK_0, 0.05),
    borderRadius: scale(30),
    paddingHorizontal: scale(12),
    paddingVertical: scale(4),
    marginLeft: scale(8),
  },
  line: {
    width: scale(2),
    backgroundColor: GET_COLORS().TEXT_LINE,
    marginHorizontal: scale(4),
  },
});
