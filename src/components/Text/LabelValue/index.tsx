import { StyleSheet, View } from "react-native";
import React from "react";
import { GET_COLORS } from "@/theme";
import { scale } from "react-native-utils-scale";
import { CText } from "@/components";
import Ionicons from "react-native-vector-icons/Ionicons";

interface Props {
  value: string | number | boolean | undefined;
  label: string | undefined;
  isLine?: boolean;
  iconName?: string;
  trailingComponent?: () => React.ReactNode;
  isDirection?: "row" | "column";
}

const LabelValueComponent = (props: Props) => {
  const {
    value,
    label,
    isLine,
    iconName,
    trailingComponent,
    isDirection = "column",
  } = props;

  if (isDirection === "row") {
    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {iconName && (
            <Ionicons name={iconName} size={24} color={GET_COLORS().BLACK_4} />
          )}

          <View
            style={{
              flex: 1,
              marginHorizontal: scale(12),
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <CText
              color={GET_COLORS().BLACK_2}
              fontWeight={"bold"}
              fontSize={14}
              style={{ flex: 1, marginRight: scale(12) }}
            >
              {label}
            </CText>
            <CText
              textAlign={"right"}
              color={GET_COLORS().BLACK_3}
              fontSize={14}
            >
              {typeof value === "boolean" ? (value ? "Có" : "Không") : value}
            </CText>
          </View>
          {trailingComponent && trailingComponent()}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {iconName && (
          <Ionicons name={iconName} size={24} color={GET_COLORS().BLACK_4} />
        )}

        <View
          style={{
            flex: 1,
            marginLeft: scale(12),
            marginRight: scale(36),
          }}
        >
          <CText
            distanceBottom={4}
            color={GET_COLORS().BLACK_3}
            fontWeight={"bold"}
            fontSize={14}
            numberOfLines={5}
          >
            {label}
          </CText>
          <CText color={GET_COLORS().BLACK_4} style={{ flex: 1 }}>
            {typeof value === "boolean" ? (value ? "Có" : "Không") : value}
          </CText>
        </View>
        {trailingComponent && trailingComponent()}
      </View>

      {isLine && <View style={styles.line} />}
    </View>
  );
};

export default React.memo(LabelValueComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  line: {
    height: scale(1),
    width: "100%",
    marginBottom: scale(12),
    marginTop: scale(12),
    backgroundColor: GET_COLORS().GRAY,
  },
});
