import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProductDetailScreen, ProductScreen } from "@/screens";
import { SCREEN_NAME } from "@/util/constants";
import { ProductStackParamList } from "@/navigator/ProductStackNavigator/ProductStackParamList";

const Stack = createNativeStackNavigator<ProductStackParamList>();

const ProductStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREEN_NAME.PRODUCT}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name={SCREEN_NAME.PRODUCT_DETAIL}
        component={ProductDetailScreen}
      />
      <Stack.Screen name={SCREEN_NAME.PRODUCT} component={ProductScreen} />
    </Stack.Navigator>
  );
};

export default ProductStack;
