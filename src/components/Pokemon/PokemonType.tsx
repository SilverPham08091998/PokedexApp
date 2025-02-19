import { StyleSheet, View, ViewStyle } from "react-native";
import { scale } from "react-native-utils-scale";
import { GET_COLORS, rgba } from "@/theme";
import { CText } from "@/components";
import React from "react";
import { PokemonTypeColors } from "@/type";

interface Props {
  type: string;
  url?: string;
  size?: {
    width?: number;
    height?: number;
  };
  containerStyle?: Omit<ViewStyle, "width,height">;
}

const CPokemonType = (props: Props) => {
  const { type, size = { width: scale(70) }, containerStyle } = props;
  const colorType = PokemonTypeColors[type.toUpperCase()];

  return (
    <View
      style={{
        ...styles.typeContainer,
        ...containerStyle,
        ...size,
        backgroundColor: rgba(colorType, 0.6),
      }}
    >
      <CText fontSize={12} fontWeight={"400"} color={GET_COLORS().WHITE}>
        {`${type.toUpperCase()}`}
      </CText>
    </View>
  );
};

const styles = StyleSheet.create({
  typeContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scale(6),
    width: scale(70),
    paddingVertical: scale(1),
  },
});

export default React.memo(CPokemonType);
