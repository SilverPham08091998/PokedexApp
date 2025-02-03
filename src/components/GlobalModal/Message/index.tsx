import React, { useImperativeHandle, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

import { scale } from "react-native-utils-scale";
import { GET_COLORS } from "@/theme";
import { CText } from "@/components";

export const globalMessageRef = React.createRef<any>();

interface GlobalMessageState {
  title: string;
  content: string;
  action?: () => void;
  isAlert?: boolean;
}

export const globalMessage = {
  show: (value: GlobalMessageState) => {
    globalMessageRef?.current?.show(value);
  },
};
const GlobalMessage = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [data, setData] = useState<GlobalMessageState>({
    title: "Warning",
    content: "You call Charles Chapo. Would you like to log it ?",
  });
  useImperativeHandle(ref, () => {
    return { show: show };
  });

  const show = (value: GlobalMessageState) => {
    setVisible(true);
    setData(value);
  };
  const { title, content, action, isAlert } = data;

  const renderFooter = () => {
    if (isAlert) {
      return (
        <View style={styles.viewButton}>
          <TouchableOpacity
            style={{
              ...styles.buttonStyle,
              width: scale(270),
            }}
            onPress={() => setVisible(false)}
          >
            <CText fontSize={16} color={GET_COLORS().PRIMARY}>
              {"OK"}
            </CText>
          </TouchableOpacity>
        </View>
      );
    }
    return (
      <View style={styles.viewButton}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => setVisible(false)}
        >
          <CText fontSize={15} color={GET_COLORS().RED}>
            {"Đóng"}
          </CText>
        </TouchableOpacity>
        <View
          style={{
            ...styles.separator,
            width: scale(1),
            height: scale(50),
            marginTop: scale(0),
          }}
        />
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => {
            setVisible(false);
            if (action) {
              action();
            }
          }}
        >
          <CText fontSize={15} color={GET_COLORS().PRIMARY}>
            {"Xác nhận"}
          </CText>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <Modal
      animationOutTiming={350}
      animationInTiming={350}
      isVisible={visible}
      style={{ margin: 0, justifyContent: "flex-end" }}
      useNativeDriverForBackdrop
      animationIn="fadeIn"
      animationOut="fadeOut"
      onBackButtonPress={() => setVisible(false)}
      backdropOpacity={0.3}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <CText
            fontSize={18}
            distanceTop={4}
            fontWeight={"700"}
            color={GET_COLORS().BLACK_2}
          >
            {title}
          </CText>
          <CText
            fontSize={14}
            distanceTop={6}
            color={GET_COLORS().BLACK_2}
            style={{ textAlign: "center" }}
          >
            {content}
          </CText>

          <View style={styles.separator} />
          {renderFooter()}
        </View>
      </View>
    </Modal>
  );
});

export default GlobalMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: scale(16),
    paddingTop: scale(16),
    justifyContent: "center",
    width: scale(270),
    backgroundColor: GET_COLORS().BACKGROUND_GRAY,
    borderRadius: scale(16),
  },
  separator: {
    marginTop: scale(16),
    width: scale(270),
    height: scale(1),
    backgroundColor: "#DEDEDF",
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: scale(270),
  },
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: scale(120),
    height: scale(45),
  },
});
