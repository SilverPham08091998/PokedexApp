import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import Header from "@/components/Header";
import { COLORS_DARK } from "@/theme";
import { navigate, SCREEN_NAME } from "@/util/constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProductStackParamList } from "@/navigator/ProductStackNavigator/ProductStackParamList";
import { CButton, CText } from "@/components";

interface Props
  extends NativeStackScreenProps<ProductStackParamList, SCREEN_NAME.PRODUCT> {}

const ProductScreen: React.FC<Props> = (props: Props) => {
  const { route } = props;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS_DARK.WHITE }}>
      <Header title={"Product Screen"} />
      <ScrollView style={{ backgroundColor: COLORS_DARK.LINE }}>
        <CText>{route.params?.userId}</CText>
      </ScrollView>
      <CButton
        title={"Navigate"}
        onPress={() => {
          navigate(SCREEN_NAME.PRODUCT_STACK, SCREEN_NAME.PRODUCT_DETAIL, {
            productId: "productId",
          });
        }}
      />
    </SafeAreaView>
  );
};

export default ProductScreen;
