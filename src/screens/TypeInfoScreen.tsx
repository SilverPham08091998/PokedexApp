import React from "react";
import { StyleSheet, View } from "react-native";
import Header from "@/components/Header";
import { scale } from "react-native-utils-scale";
import { COLORS_LIGHT } from "@/theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { SCREEN_NAME } from "@/util";
import { SceneRendererProps } from "react-native-tab-view";
import { RoutesType } from "@/type";
import TabViewComponent from "@/components/TabView";
import { ROUTE, typeRoutes } from "@/screens/components/TabsType";
import TabInfo from "@/screens/components/TabsType/TabInfo";
import TabPokemon from "@/screens/components/TabsType/TabPokemon";
import TabMove from "@/screens/components/TabsType/TabMove";
import { RootStackParamList } from "@/navigator/Routes";

interface Props
  extends NativeStackScreenProps<RootStackParamList, SCREEN_NAME.TYPE_INFO> {}

const TypeInfoScreen: React.FC<Props> = (props) => {
  const type = props.route.params?.type;
  const renderScene = (
    sceneRenderProps: SceneRendererProps & { route: RoutesType }
  ) => {
    switch (sceneRenderProps.route.key) {
      case ROUTE.INFO:
        return <TabInfo />;
      case ROUTE.MOVES:
        return <TabMove />;
      case ROUTE.POKEMONS:
        return <TabPokemon />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Header title={type.name} />
      <TabViewComponent
        indexDefault={0}
        renderScene={renderScene}
        routesProps={typeRoutes}
        sceneContainerStyle={{
          paddingHorizontal: scale(0),
          paddingVertical: scale(12),
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS_LIGHT.WHITE,
  },
  viewButtonFilter: {
    flexDirection: "row",
    paddingVertical: scale(8),
    paddingHorizontal: scale(16),
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonFilter: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: scale(8),
    paddingHorizontal: scale(16),
    borderColor: COLORS_LIGHT.BORDER_3,
    borderWidth: scale(1),
    borderRadius: scale(32),
    flexDirection: "row",
  },
});

export default TypeInfoScreen;
