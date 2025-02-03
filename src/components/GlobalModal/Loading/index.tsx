import React, { useEffect, useImperativeHandle, useState } from "react";
import { Modal, StatusBar, StyleSheet, View } from "react-native";
import { scale } from "react-native-utils-scale";
import { UIActivityIndicator } from "react-native-indicators";
import { useAppSelector } from "@/util/hook";

export const globalLoadingRef = React.createRef<any>();

export const globalLoading = {
  show: () => {
    globalLoadingRef?.current?.show();
  },
  hide: () => {
    globalLoadingRef?.current?.hide();
  },
};

const GlobalLoading = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState<boolean>(false);
  const { loading } = useAppSelector((state) => {
    return state.appState;
  });
  useEffect(() => {
    setVisible(loading);
  }, [loading]);

  useImperativeHandle(ref, () => {
    return { show: show, hide: hide };
  });

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  return (
    <Modal visible={visible} animationType={"none"} transparent>
      <StatusBar
        translucent
        backgroundColor={"rgba(0,0,0,0.6)"}
        barStyle={"light-content"}
      />
      <View style={styles.main}>
        <UIActivityIndicator color="white" size={scale(50)} />
        <View
          style={[
            {
              width: "80%",
              height: scale(100),
              position: "absolute",
              right: "10%",
              bottom: scale(60),
              left: "10%",
            },
          ]}
        />
      </View>
    </Modal>
  );
});

export default GlobalLoading;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
});
