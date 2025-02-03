import React from "react";
import { SafeAreaView, ScrollView } from "react-native";
import Header from "@/components/Header";
import { COLORS_DARK } from "@/theme";
import { SCREEN_NAME } from "@/util/constants";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProductStackParamList } from "@/navigator/Routes";
import { CText } from "@/components";

interface Props
  extends NativeStackScreenProps<
    ProductStackParamList,
    SCREEN_NAME.PRODUCT_DETAIL
  > {}

const ProductDetailScreen: React.FC<Props> = (props: Props) => {
  const { route } = props;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS_DARK.WHITE }}>
      <Header title={"Product Detail Screen"} />
      <ScrollView style={{ backgroundColor: COLORS_DARK.LINE }}>
        <CText>{route.params?.productId}</CText>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;
