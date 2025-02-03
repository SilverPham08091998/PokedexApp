import React, { useState } from "react";
import {
  Keyboard,
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { fontScale, scale } from "react-native-utils-scale";
import { GET_COLORS, TYPE } from "@/theme";
import { CText } from "../index";
import Ionicons from "react-native-vector-icons/Ionicons";

export interface InputProps {
  title?: string;
  password?: boolean;
  isSecured?: boolean;
  value: string;
  onChangeText?: any;
  inputStyle?: StyleProp<TextStyle>;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
  containerStyle?: StyleProp<ViewStyle>;
  editable?: boolean;
  onBlur?: any;
  trailing?: React.ReactNode | null;
  keyboardType?: KeyboardTypeOptions;
  onBackspacePress?: any;
  textSize?: number;
  enableFocusChangeBorder?: boolean;
  showErrorBorder?: boolean;
  leading?: React.ReactNode;
  placeholderTextColor?: string;
  textError?: string;
  textErrorStyle?: TextStyle;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  clearButton?: boolean;
  maxLength?: number;
  onEndEditing?: () => void;
  autoFocus?: boolean;
  distanceBottom?: number;
  titleStyle?: TextStyle;
  onClearButton?: () => void;
  returnKey?: ReturnKeyTypeOptions;
}

const CInput: React.FC<InputProps> = React.forwardRef(
  (props: InputProps, ref) => {
    const {
      isSecured,
      value,
      onChangeText,
      placeholder,
      multiline = false,
      editable = true,
      inputStyle,
      containerStyle,
      onBlur,
      password,
      keyboardType,
      title,
      onBackspacePress,
      textSize,
      enableFocusChangeBorder,
      showErrorBorder,
      leading,
      trailing,
      placeholderTextColor,
      textError,
      textErrorStyle,
      autoCapitalize,
      clearButton,
      maxLength,
      onEndEditing,
      autoFocus = false,
      distanceBottom = 0,
      titleStyle = {},
      onClearButton,
      returnKey = "done",
      numberOfLines,
    } = props;

    const [passwordSecure, setPasswordSecure] = useState(password === true);

    const [height, setHeight] = useState<number>(0);

    const [focused, setFocused] = useState(false);

    const inputRef = React.useRef<TextInput>(null);

    const renderRightElement = () => {
      if (password) {
        return (
          <View style={styles.right}>
            <TouchableOpacity
              onPress={() => setPasswordSecure(!passwordSecure)}
            >
              <Ionicons
                size={scale(20)}
                color={GET_COLORS()?.BLACK_4}
                name={passwordSecure ? "eye-off" : "eye"}
              />
            </TouchableOpacity>
          </View>
        );
      }
      if (clearButton && value.length > 0) {
        return (
          <View style={styles.right}>
            <TouchableOpacity
              onPress={() => onClearButton && onClearButton()}
              disabled={!editable}
            >
              <Ionicons
                size={scale(20)}
                color={GET_COLORS().BLACK_3}
                name={"close"}
              />
            </TouchableOpacity>
          </View>
        );
      }
      return trailing;
    };

    return (
      <View style={{ marginBottom: distanceBottom }}>
        {title ? (
          <CText
            style={titleStyle}
            fontSize={16}
            color={GET_COLORS().BLACK_2}
            fontWeight={"700"}
          >
            {title}
          </CText>
        ) : (
          <View />
        )}
        <View
          style={[
            styles.container,
            multiline
              ? {
                  height: Math.max(40, height),
                }
              : {},
            containerStyle,
            focused ? { borderColor: GET_COLORS()?.PRIMARY } : {},
            showErrorBorder ? { borderColor: GET_COLORS().RED } : {},
            { opacity: editable ? 1 : 0.5 },
          ]}
        >
          {leading}
          <TextInput
            ref={inputRef}
            keyboardType={keyboardType}
            placeholderTextColor={
              placeholderTextColor
                ? placeholderTextColor
                : GET_COLORS().PLACEHOLDER
            }
            style={[
              styles.inputStyle,
              multiline ? styles.multiline : {},
              inputStyle,
              textSize ? { fontSize: fontScale(textSize) } : {},
            ]}
            secureTextEntry={password ? passwordSecure : isSecured || false}
            value={value}
            onChangeText={(text) => {
              if (onChangeText) {
                onChangeText(text);
              }
            }}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                onBackspacePress && onBackspacePress();
              }
              if (nativeEvent?.key === "Enter") {
                Keyboard.dismiss();
              }
            }}
            onFocus={() => {
              enableFocusChangeBorder && setFocused(true);
            }}
            onBlur={(e) => {
              enableFocusChangeBorder && setFocused(false);
              onBlur && onBlur(e);
            }}
            underlineColorAndroid={"transparent"}
            autoCapitalize={autoCapitalize ? autoCapitalize : "none"}
            returnKeyType={returnKey}
            maxLength={maxLength ? maxLength : (null as any)}
            placeholder={placeholder || ""}
            multiline={multiline || false}
            autoFocus={autoFocus}
            editable={editable}
            onEndEditing={onEndEditing}
            onContentSizeChange={(event) => {
              if (multiline) {
                setHeight(event.nativeEvent.contentSize.height + 30);
              }
            }}
            numberOfLines={numberOfLines}
          />
          {renderRightElement()}
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
  }
);

export default React.memo(CInput);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: scale(40),
    borderBottomWidth: scale(1),
    borderColor: GET_COLORS().TEXT_LINE,
    flexDirection: "row",
  },
  inputStyle: {
    flex: 1,
    padding: scale(0),
    fontSize: fontScale(14),
    color: GET_COLORS().BLACK_2,
  },
  right: {
    marginLeft: scale(8),
  },
  multiline: {
    textAlignVertical: "top",
  },
});
