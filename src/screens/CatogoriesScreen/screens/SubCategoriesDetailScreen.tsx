import React from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import Header from "@/components/Header";
import { scale } from "react-native-utils-scale";
import { COLORS_LIGHT } from "@/theme";
import { CText } from "@/components";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

const SubCategoriesDetailScreen: React.FC<any> = () => {
  const renderFilter = () => {
    return (
      <View style={styles.viewButtonFilter}>
        <TouchableOpacity style={styles.buttonFilter} onPress={() => {}}>
          <AntDesign name={"filter"} color={COLORS_LIGHT.BORDER_3} size={24} />
          <CText fontSize={16} color={COLORS_LIGHT.BLACK_3} fontWeight={"500"}>
            {"Lọc"}{" "}
          </CText>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonFilter} onPress={() => {}}>
          <Ionicons
            name={"swap-vertical"}
            color={COLORS_LIGHT.BORDER_3}
            size={24}
          />
          <CText fontSize={16} color={COLORS_LIGHT.BLACK_3} fontWeight={"500"}>
            {"Áp dụng"}
          </CText>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={"Danh mục 1"} />
      {renderFilter()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS_LIGHT.WHITE,
  },
  viewButtonFilter: {
    flexDirection: "row",
    paddingVertical: scale(8),
    paddingHorizontal: scale(16),
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonFilter: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: scale(8),
    paddingHorizontal: scale(16),
    borderColor: COLORS_LIGHT.BORDER_3,
    borderWidth: scale(1),
    borderRadius: scale(32),
    flexDirection: "row",
  },
});

export default SubCategoriesDetailScreen;
