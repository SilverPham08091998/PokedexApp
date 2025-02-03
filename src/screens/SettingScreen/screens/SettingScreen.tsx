import React, { useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import {
  CButton,
  CDropdown,
  CHeader,
  CInput,
  CSwitch,
  CText,
  DateTimerPicker,
  EmptyList,
  globalLoading,
  globalMessage,
} from "@/components";
import { GET_COLORS } from "@/theme";

const data = [
  {
    id: 1,
    component: <CButton title={"Button"} onPress={() => {}} />,
    title: "Button",
  },
  {
    id: 2,
    component: <DateTimerPicker mode={"date"} />,
    title: "Date Time Picker",
  },
  {
    id: 3,
    component: (
      <CDropdown data={[{ label: 1, value: "one" }]} placeholder={"Search"} />
    ),
    title: "Dropdown",
  },
  {
    id: 4,
    component: <EmptyList />,
    title: "Empty List",
  },
  {
    id: 5,
    component: (
      <CButton
        title={"Open Modal Loading"}
        onPress={() => {
          globalLoading.show();
          setTimeout(() => {
            globalLoading.hide();
          }, 1000);
        }}
      />
    ),
    title: "Global Modal Loading",
  },
  {
    id: 6,
    component: (
      <CButton
        title={"Open Modal Message"}
        onPress={() => {
          globalMessage.show({ title: "Thông báo", content: "Bạn đã bị bắt" });
        }}
      />
    ),
    title: "Global Modal Message",
  },
  {
    id: 7,
    component: <CSwitch handleOnPress={() => {}} value={true} />,
    title: "Switch",
  },
  {
    id: 8,
    component: (
      <View>
        <CInput value={""} />
      </View>
    ),
    title: "Text Input",
  },
];

const SettingScreen = () => {
  const memo = useMemo(() => {
    return data;
  }, []);

  return (
    <View style={styles.container}>
      <CHeader title={"Default Component"} />
      <View style={styles.main}>
        <FlatList
          data={memo}
          renderItem={({ item }) => {
            return (
              <View style={{ flex: 1, paddingHorizontal: 12 }}>
                <CText style={styles.titleStyle}>{item.title}</CText>
                {item.component}
              </View>
            );
          }}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          ListFooterComponent={() => <View style={{ height: 20 }} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GET_COLORS().WHITE,
  },
  main: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titleStyle: {
    fontSize: 20,
    color: GET_COLORS().BLACK_4,
    fontWeight: "bold",
    paddingBottom: 20,
  },
});

export default SettingScreen;
