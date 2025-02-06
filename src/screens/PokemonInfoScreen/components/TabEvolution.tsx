import React from "react";
import { View } from "react-native";
import { CText } from "@/components";

interface Props {}

const TabEvolution: React.FC<Props> = (props: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <CText>Base Stats</CText>
    </View>
  );
};

export default TabEvolution;
