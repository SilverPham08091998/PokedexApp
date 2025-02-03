import { SafeAreaView } from "react-native";
import { CHeader } from "@/components";
import React from "react";
import { GET_COLORS } from "@/theme";

const UserScreens = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: GET_COLORS()?.BACKGROUND_GRAY,
      }}
    >
      <CHeader title={"User"} isShowBack={true} />
    </SafeAreaView>
  );
};

export default UserScreens;
