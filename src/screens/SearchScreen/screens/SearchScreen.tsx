import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { CHeader } from "@/components";
import { COLORS_LIGHT, GET_COLORS } from "@/theme";
import React from "react";
import { scale } from "react-native-utils-scale";

const SearchScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CHeader title={"Search"} isShowBack={true} />
      <ScrollView style={{ flex: 1 }} nestedScrollEnabled={true} />
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: GET_COLORS().BACKGROUND_GRAY,
    flex: 1,
  },
  line: {
    backgroundColor: COLORS_LIGHT.BACKGROUND_GRAY,
    width: "100%",
    height: scale(8),
    marginTop: scale(8),
  },
});
