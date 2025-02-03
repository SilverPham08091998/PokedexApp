import moment from "moment";
import React, { useState } from "react";
import {
  StyleSheet,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { scale } from "react-native-utils-scale";
import { CText } from "..";
import { GET_COLORS, TYPE } from "@/theme";
import Ionicons from "react-native-vector-icons/Ionicons";

export interface DateTimePickerProps {
  style?: ViewStyle;
  title?: string;
  value?: Date;
  mode: "date" | "time" | "datetime";
  textErrorStyle?: TextStyle;
  onConfirm?: (date: Date) => void;
  textError?: string | null;
  color?: string;
  minDate?: Date;
  maxDate?: Date;
  fontSize?: number;
  disabled?: boolean;
  placeholder?: string;
  formatMonthDay?: boolean;
  titleStyle?: TextStyle;
  distanceBottom?: number;
}

const DateTimerPicker: React.FC<DateTimePickerProps> = (props) => {
  const [visible, setVisible] = useState<boolean>(false);

  const {
    style = {},
    title,
    value = undefined,
    mode,
    textError,
    textErrorStyle,
    onConfirm = () => null,
    color = GET_COLORS().PLACEHOLDER,
    minDate,
    maxDate,
    fontSize = 14,
    disabled,
    placeholder,
    formatMonthDay,
    distanceBottom = 0,
    titleStyle = {},
  } = props;

  const displayPlaceholder = placeholder
    ? placeholder
    : mode === "date"
    ? "dd/mm/yyyy"
    : "hh:mm";
  return (
    <View
      pointerEvents={disabled ? "none" : "auto"}
      style={{
        opacity: disabled ? 0.6 : 1,
        marginBottom: scale(distanceBottom),
      }}
    >
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
      <View style={[styles.container, style]}>
        <TouchableWithoutFeedback onPress={() => setVisible(true)}>
          <View style={styles.row}>
            <CText
              fontSize={fontSize}
              color={
                value === undefined
                  ? GET_COLORS().BLACK_4
                  : GET_COLORS().BLACK_2
              }
            >
              {value === undefined
                ? displayPlaceholder
                : moment(value).format(
                    mode === "date" && formatMonthDay
                      ? "MM/DD/YYYY"
                      : mode === "time"
                      ? "h:s"
                      : mode === "datetime"
                      ? "DD/MM/yy HH:mm"
                      : "DD/MM/yy"
                  )}
            </CText>
            <Ionicons name={"calendar"} size={scale(24)} color={color} />
          </View>
        </TouchableWithoutFeedback>
        <DateTimePickerModal
          isVisible={visible}
          mode={mode}
          date={value}
          onConfirm={(date) => {
            setVisible(false);
            onConfirm(date);
          }}
          onCancel={() => setVisible(false)}
          minimumDate={minDate}
          maximumDate={maxDate}
          confirmTextIOS={"Xác nhận"}
          cancelTextIOS={"Huỷ"}
        />
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

export default React.memo(DateTimerPicker);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: scale(40),
    backgroundColor: GET_COLORS().WHITE,
    borderBottomWidth: scale(1),
    borderColor: GET_COLORS().TEXT_LINE,
    flexDirection: "row",
    alignItems: "center",
  },
  row: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  textError: {
    color: GET_COLORS().RED,
    marginTop: scale(10),
    fontSize: scale(14),
  },
});
