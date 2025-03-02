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
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";

interface Props {
  title: string;
  isShowBack?: boolean;
  onBack?: () => void;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  colorHeader?: string;
}

const CHeader: React.FC<Props> = (props) => {
  const { goBack } = useNavigation();
  const {
    title = "Default",
    titleStyle = {},
    onBack,
    containerStyle = {},
    isShowBack = true,
    colorHeader = COLORS_LIGHT.PRIMARY,
  } = props;

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[
        rgba(colorHeader, 0.1),
        rgba(colorHeader, 0.2),
        rgba(colorHeader, 0.3),
        rgba(colorHeader, 0.4),
      ]}
      style={{
        paddingTop: useSafeAreaInsets().top,
      }}
    >
      <View
        style={{
          ...containerStyle,
          ...styles.container,
        }}
      >
        {isShowBack && (
          <TouchableOpacity onPress={() => (onBack ? onBack : goBack())}>
            <MaterialIcon
              name={"keyboard-arrow-left"}
              size={scale(24)}
              color={colorHeader}
            />
          </TouchableOpacity>
        )}
        <CText
          fontWeight={"700"}
          fontSize={18}
          color={colorHeader}
          textAlign={"center"}
          style={{
            ...titleStyle,
            flex: 1,
            paddingHorizontal: scale(isShowBack ? 4 : 0),
          }}
        >
          {title}
        </CText>
      </View>
    </LinearGradient>
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
    backgroundColor: GET_COLORS().TRANSPARENT,
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
