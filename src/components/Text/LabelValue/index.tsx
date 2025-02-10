import { StyleSheet, View } from "react-native";
import React from "react";
import { GET_COLORS } from "@/theme";
import { scale } from "react-native-utils-scale";
import { CText } from "@/components";
import Ionicons from "react-native-vector-icons/Ionicons";

interface Props {
  value?: string | number | boolean | undefined;
  label: string | undefined;
  isLine?: boolean;
  iconName?: string;
  trailingComponent?: () => React.ReactNode;
  isDirection?: "row" | "column";
  valueComponent?: () => React.ReactNode;
}

const LabelValueComponent = (props: Props) => {
  const {
    value,
    label,
    isLine,
    iconName,
    trailingComponent,
    isDirection = "column",
    valueComponent,
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
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <CText
            distanceBottom={4}
            color={GET_COLORS().BLACK_3}
            fontWeight={"bold"}
            fontSize={14}
            numberOfLines={10}
            style={{
              flex: 1,
            }}
          >
            {label}
          </CText>
          <View
            style={{
              flex: 2,
              marginHorizontal: scale(24),
            }}
          >
            {valueComponent ? (
              valueComponent()
            ) : (
              <CText
                fontSize={14}
                fontWeight={"500"}
                textAlign={"left"}
                color={GET_COLORS().BLACK_4}
              >
                {typeof value === "boolean" ? (value ? "Có" : "Không") : value}
              </CText>
            )}
          </View>
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
