import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import { COLORS_LIGHT, GET_COLORS } from "@/theme";
import { scale } from "react-native-utils-scale";
import { CHeader, CText, SwipeItem } from "@/components";

const HomeScreens = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CHeader title={"Home"} isShowBack={true} />
      <FlatList
        data={[1, 2, 3, 4, 5]}
        renderItem={({ index }) => {
          return (
            <SwipeItem
              showLeftAction={false}
              showRightAction={true}
              rightActions={"both"}
              styleSwipeContainer={{ marginHorizontal: scale(24) }}
              renderItemComponent={() => {
                return (
                  <View
                    style={{
                      height: 100,
                      backgroundColor: GET_COLORS().PRIMARY,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CText
                      fontSize={16}
                      fontWeight={"600"}
                      color={GET_COLORS().WHITE}
                    >
                      {`Swipe ${index + 1}`}
                    </CText>
                  </View>
                );
              }}
            />
          );
        }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
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
});
