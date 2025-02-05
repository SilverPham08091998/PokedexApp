import React from "react";
import { SceneRendererProps } from "react-native-tab-view";
import { RoutesType } from "@/type";
import {
  pokemonInfoRoutes,
  ROUTE,
} from "@/screens/PokemonInfoScreen/constants";
import TabAbout from "@/screens/PokemonInfoScreen/components/TabAbout";
import TabStats from "@/screens/PokemonInfoScreen/components/TabStats";
import TabEvolution from "@/screens/PokemonInfoScreen/components/TabEvolution";
import TabMoves from "@/screens/PokemonInfoScreen/components/TabMoves";
import TabViewComponent from "@/components/TabView";

interface Props {}

const TabViewPokemonInfo: React.FC<Props> = () => {
  const renderScene = (props: SceneRendererProps & { route: RoutesType }) => {
    switch (props.route.key) {
      case ROUTE.ABOUT:
        return <TabAbout />;
      case ROUTE.STATS:
        return <TabStats />;
      case ROUTE.EVOLUTION:
        return <TabEvolution />;
      case ROUTE.MOVES:
        return <TabMoves />;
      default:
        return null;
    }
  };
  return (
    <TabViewComponent
      indexDefault={0}
      renderScene={renderScene}
      routesProps={pokemonInfoRoutes}
      sceneContainerStyle={{
        paddingHorizontal: 0,
        paddingVertical: 0,
      }}
      swipeEnabled={true}
    />
  );
};

export default TabViewPokemonInfo;
