import { StyleSheet, TouchableOpacity, View } from "react-native";
import { CText } from "@/components";
import { GET_COLORS } from "@/theme";
import { scale } from "react-native-utils-scale";
import React from "react";

interface Props {
  headerTitle?: string;
  onPressDone: () => void;
}

const HeaderModal: React.FC<Props> = (props: Props) => {
  const { headerTitle, onPressDone } = props;
  return (
    <View>
      <View style={styles.topBarModal} />
      <View style={{ flexDirection: "row" }}>
        <CText
          fontWeight={"700"}
          fontSize={16}
          color={GET_COLORS().BLACK_1}
          style={{
            marginHorizontal: scale(24),
            marginBottom: scale(24),
            flex: 1,
          }}
        >
          {headerTitle}
        </CText>
        <TouchableOpacity
          onPress={() => onPressDone()}
          style={{ paddingHorizontal: scale(24) }}
        >
          <CText fontSize={16} fontWeight={"700"} color={GET_COLORS().PRIMARY}>
            {"Xong"}
          </CText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBarModal: {
    alignSelf: "center",
    marginTop: scale(20),
    marginBottom: scale(20),
    width: scale(70),
    height: scale(6),
    backgroundColor: "#E4E4E4",
  },
});
export default HeaderModal;
