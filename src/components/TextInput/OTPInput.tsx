import React, { useCallback, useEffect, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { CText } from "@/components";
import { fontScale, scale } from "react-native-utils-scale";
import { GET_COLORS, TYPE } from "@/theme";
import moment from "moment";
import { RenderCellOptions } from "react-native-confirmation-code-field/esm/CodeField";

const CELL_COUNT = 6;
const OTP_RESEND_TIME = 10;

interface OtpInputProps {
  style?: StyleProp<ViewStyle>;
  onCompleteOTP: (code: string) => void;
  phoneNumber?: string;
  email?: string;
  onResendOTP: () => void;
  errorMessage?: string;
}

const OTPInput = (props: OtpInputProps) => {
  const { onCompleteOTP, onResendOTP } = props;
  const [value, setValue] = useState("");
  const [count, setCount] = useState(OTP_RESEND_TIME);

  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });

  const [OTPProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    if (value.length === CELL_COUNT) {
      onCompleteOTP(value);
    }
  }, [value]);

  useEffect(() => {
    let timer = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    if (count === 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [count]);

  const resendOTP = async () => {
    setCount(OTP_RESEND_TIME);
    onResendOTP();
  };

  const renderCell = useCallback(
    ({ index, symbol, isFocused }: RenderCellOptions) => (
      <View
        key={index}
        onLayout={getCellOnLayoutHandler(index)}
        style={[styles.cell, isFocused && styles.focusCell]}
      >
        {symbol || isFocused ? (
          <CText style={styles.cellText}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </CText>
        ) : (
          <View />
        )}
      </View>
    ),
    []
  );

  const renderNote = () => {
    return (
      <View style={{ marginTop: scale(16) }}>
        <CText
          distanceBottom={2}
          textDecorationLine={"underline"}
          color={GET_COLORS().BLACK_3}
          fontFamily={TYPE.ITALIC}
        >
          {"Chú ý:"}
        </CText>
        <View style={{ flexDirection: "row", marginBottom: scale(4) }}>
          <View style={styles.dot} />
          <CText color={GET_COLORS().BLACK_3} fontFamily={TYPE.ITALIC}>
            {"Vui lòng không nhập sai mã OTP quá 5 lần."}
          </CText>
        </View>
        <View style={{ flexDirection: "row", marginBottom: scale(4) }}>
          <View style={styles.dot} />
          <CText color={GET_COLORS().BLACK_3} fontFamily={TYPE.ITALIC}>
            {"Mã OTP xác thực sẽ có hiệu lực trong 2 phút."}
          </CText>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.dot} />
          <CText color={GET_COLORS().BLACK_3} fontFamily={TYPE.ITALIC}>
            {
              "Nếu không nhận được mã vui lòng nhấn gửi lại mã.Tối đa 3 lần gửi lại trong ngày."
            }
          </CText>
        </View>
      </View>
    );
  };

  return (
    <View style={{ width: "100%" }}>
      <CodeField
        ref={ref}
        {...OTPProps}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        caretHidden={false}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={renderCell}
      />
      <View style={{ alignItems: "center" }}>
        <CText fontSize={14} distanceBottom={2} textAlign={"center"}>
          {"Mã xác thực OTP của bạn đã gửi tới số điện thoại và email đăng kí."}
        </CText>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <CText distanceBottom={4} color={GET_COLORS().BLACK_2}>
          {`Gửi lại OTP trong ${moment.utc(count * 1000).format("mm:ss")} ?`}
        </CText>
        <TouchableOpacity style={{}} disabled={count !== 0} onPress={resendOTP}>
          <CText
            fontWeight={"700"}
            style={{ marginHorizontal: scale(4) }}
            color={count !== 0 ? GET_COLORS().BLACK_4 : GET_COLORS().PRIMARY}
          >
            {"Gửi lại OTP."}
          </CText>
        </TouchableOpacity>
      </View>
      {renderNote()}
    </View>
  );
};
const styles = StyleSheet.create({
  cell: {
    alignItems: "center",
    borderColor: GET_COLORS().BLACK_4,
    borderRadius: scale(8),
    borderWidth: 1,
    height: scale(48),
    width: scale(48),
  },
  cellText: {
    fontSize: fontScale(24),
    height: "100%",
    lineHeight: scale(46),
    textAlign: "center",
    width: "100%",
  },
  centeredView: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginTop: 22,
  },
  codeFiledRoot: {
    alignItems: "center",
    marginBottom: scale(16),
    marginTop: scale(16),
    paddingHorizontal: scale(24),
    justifyContent: "space-around",
  },
  focusCell: {
    borderColor: GET_COLORS().BLACK_2,
  },
  dot: {
    width: scale(4),
    height: scale(4),
    backgroundColor: GET_COLORS().BLACK_4,
    marginHorizontal: scale(4),
    borderRadius: scale(32),
    marginTop: scale(7),
  },
});

export default React.memo(OTPInput);
