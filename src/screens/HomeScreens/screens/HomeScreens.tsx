import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { COLORS_LIGHT, GET_COLORS, rgba } from "@/theme";
import { scale } from "react-native-utils-scale";
import { useAppDispatch, useAppSelector } from "@/util";
import { CPokemonItem, CText } from "@/components";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ReduxAction } from "@/redux";

const HomeScreens = () => {
  const dispatch = useAppDispatch();
  const { listPokedex } = useAppSelector((state) => {
    return state.home;
  });

  const onPressButtonPagination = (url: string) => {
    dispatch(ReduxAction.HOME_ACTION.getPokedex(url));
  };

  const renderPagination = () => {
    return (
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          onPress={() =>
            listPokedex?.previous &&
            onPressButtonPagination(listPokedex?.previous)
          }
          style={styles.buttonContainer}
          disabled={!listPokedex?.previous}
        >
          <Ionicons name={"play-back"} size={24} color={GET_COLORS().PRIMARY} />
        </TouchableOpacity>
        <CText
          style={styles.textPage}
          fontSize={18}
          color={COLORS_LIGHT.PRIMARY}
          fontWeight={"bold"}
        >
          {listPokedex?.page}
        </CText>
        <TouchableOpacity
          onPress={() =>
            listPokedex?.next && onPressButtonPagination(listPokedex?.next)
          }
          style={styles.buttonContainer}
          disabled={!listPokedex?.next}
        >
          <Ionicons
            name={"play-forward"}
            size={24}
            color={GET_COLORS().PRIMARY}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        data={listPokedex?.data}
        columnWrapperStyle={{ justifyContent: "space-around" }}
        numColumns={2}
        renderItem={({ item }) => {
          return <CPokemonItem item={item} />;
        }}
        ItemSeparatorComponent={() => <View style={{ height: scale(12) }} />}
        ListFooterComponent={renderPagination}
      />
    </SafeAreaView>
  );
};

export default HomeScreens;

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
  paginationContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: scale(24),
  },
  buttonContainer: {
    alignItems: "center",
    borderColor: GET_COLORS().PRIMARY,
    borderRadius: scale(6),
    borderWidth: scale(1),
    justifyContent: "center",
    height: scale(40),
    width: scale(40),
  },
  textPage: {
    height: scale(35),
    width: scale(35),
    marginHorizontal: scale(24),
    backgroundColor: rgba(COLORS_LIGHT.PRIMARY, 0.1),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scale(12),
  },
});
