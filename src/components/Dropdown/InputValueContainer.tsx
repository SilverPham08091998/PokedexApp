import { StyleSheet, TextStyle, View } from "react-native";
import { CText } from "@/components";
import { GET_COLORS, TYPE } from "@/theme";
import { scale } from "react-native-utils-scale";
import React, { useCallback } from "react";
import { BaseOption } from "@/type";
import Chevron from "@/components/Dropdown/Chevron";
import CheckSelectedValue from "@/components/Dropdown/CheckSelectedValue";

interface Props<T extends BaseOption> {
  isMultiple: boolean;
  multipleValues?: Array<T>;
  placeholder?: string;
  onRemoveMultipleValue?: (item: T) => void;
  disabled: boolean;
  onPressOpen: () => void;
  title?: string;
  titleStyle?: TextStyle;
  textError?: string;
  textErrorStyle?: TextStyle;
  singleValue?: T;
  data: Array<T>;
}

const InputValueContainer: <T extends BaseOption>(
  props: Props<T>
) => React.ReactElement = <T extends BaseOption>(props: Props<T>) => {
  const {
    isMultiple,
    multipleValues,
    placeholder,
    onRemoveMultipleValue,
    disabled,
    onPressOpen,
    title,
    titleStyle,
    textErrorStyle,
    textError,
    singleValue,
    data,
  } = props;

  const renderPlaceHolder = () => {
    return (
      <View style={{ flex: 1, marginVertical: scale(8) }}>
        <CText color={GET_COLORS().PLACEHOLDER} fontSize={14}>
          {placeholder}
        </CText>
      </View>
    );
  };

  const MultipleValue = useCallback(() => {
    if (!multipleValues || multipleValues?.length === 0) {
      return renderPlaceHolder();
    }
    return (
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: scale(4),
          marginVertical: scale(8),
          paddingRight: scale(0),
          flex: 1,
        }}
      >
        {multipleValues?.map((item, index) => {
          return (
            <CheckSelectedValue
              key={index}
              label={item.label}
              onPress={() => {
                onRemoveMultipleValue && onRemoveMultipleValue(item);
              }}
            />
          );
        })}
      </View>
    );
  }, [multipleValues]);

  const SingleValue = () => {
    if (!singleValue) {
      return renderPlaceHolder();
    }
    return (
      <CText
        color={disabled ? GET_COLORS().PLACEHOLDER : GET_COLORS().BLACK_2}
        fontSize={14}
        numberOfLines={1}
        ellipseMode="tail"
        style={{
          flex: 1,
        }}
      >
        {data.find((item) => item.value === singleValue?.value)?.label}
      </CText>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      {title && (
        <CText
          style={titleStyle}
          color={GET_COLORS().BLACK_2}
          fontSize={16}
          fontWeight={"700"}
        >
          {title}
        </CText>
      )}
      <View style={styles.container}>
        {isMultiple ? <MultipleValue /> : <SingleValue />}
        <Chevron disabled={disabled} onPressIcon={onPressOpen} />
      </View>
      {textError && (
        <CText
          fontFamily={TYPE.ITALIC}
          fontSize={12}
          color={GET_COLORS().RED}
          style={{ marginTop: scale(5), ...textErrorStyle }}
        >
          {textError}
        </CText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: GET_COLORS().TEXT_LINE,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
});
export default React.memo(InputValueContainer) as typeof InputValueContainer;
