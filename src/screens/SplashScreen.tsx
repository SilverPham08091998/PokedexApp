import { StyleSheet, View } from "react-native";
import { ANIMATION_JSON, GET_COLORS } from "@/theme";
import React, { useEffect } from "react";
import LottieView from "lottie-react-native";
import { useAppDispatch } from "@/util";
import { ReduxAction } from "@/redux";

const SplashScreen = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(ReduxAction.APP_STATE_ACTION.setUpApp());
  }, []);
  return (
    <View style={styles.container}>
      <LottieView source={ANIMATION_JSON.splash} autoPlay loop />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GET_COLORS()?.WHITE,
    alignItems: "center",
  },
});

export default SplashScreen;
