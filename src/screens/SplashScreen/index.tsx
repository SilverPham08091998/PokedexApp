import { StyleSheet, View } from "react-native";
import { CImage, CText } from "@/components";
import { GET_COLORS, IMAGE_URL } from "@/theme";
import React from "react";
import { scale } from "react-native-utils-scale";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <CImage
        source={IMAGE_URL.avatar}
        resizeMode={"contain"}
        style={styles.image}
      />
      <CText
        fontSize={30}
        color={GET_COLORS()?.PRIMARY}
        style={{
          padding: scale(30),
        }}
      >
        Avatar
      </CText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GET_COLORS()?.WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
  image: { width: "100%", height: "80%" },
});

export default SplashScreen;
