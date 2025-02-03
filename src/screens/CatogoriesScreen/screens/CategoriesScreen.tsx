import { SafeAreaView } from "react-native";
import { ButtonMaskedView, CCheck, CHeader } from "@/components";
import { GET_COLORS } from "@/theme";
import React, { useState } from "react";
import { scale } from "react-native-utils-scale";

const CategoriesScreen = () => {
  const [value, setValue] = useState<string>("totalAmount");
  const [check, setCheck] = useState(true);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: GET_COLORS()?.BACKGROUND_GRAY,
      }}
    >
      <CHeader title={"Categories"} isShowBack={true} />

      <ButtonMaskedView
        data={[
          { label: "Ngày tạo", value: "createdDate" },
          { label: "Tổng tiền", value: "totalAmount" },
          { label: "Số lượng", value: "quantity" },
        ]}
        widthTab={100}
        defaultValue={{ label: "Tổng tiền đơn hàng", value: value }}
        onPress={(item) => {
          setValue(item?.value + "");
          setTimeout(() => {
            console.log("====> runJS");
          }, 100);
        }}
      />
      <CCheck
        type={"checkbox"}
        check={check}
        size={scale(24)}
        onPress={() => {
          setCheck(!check);
        }}
      />
    </SafeAreaView>
  );
};

export default CategoriesScreen;
