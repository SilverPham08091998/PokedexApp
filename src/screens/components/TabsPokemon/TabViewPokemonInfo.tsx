import React from "react";
import { SceneRendererProps } from "react-native-tab-view";
import { RoutesType } from "@/type";
import {
  pokemonInfoRoutes,
  ROUTE,
} from "@/screens/components/TabsPokemon/index";
import TabAbout from "@/screens/components/TabsPokemon/TabAbout";
import TabStats from "@/screens/components/TabsPokemon/TabStats";
import TabEvolution from "@/screens/components/TabsPokemon/TabEvolution";
import TabMoves from "@/screens/components/TabsPokemon/TabMoves";
import TabViewComponent from "@/components/TabView";
import { scale } from "react-native-utils-scale";
import TabEntries from "@/screens/components/TabsPokemon/TabEntries";

interface Props {
  activeColor: string;
}

const TabViewPokemonInfo: React.FC<Props> = (props) => {
  const renderScene = (
    sceneRenderProps: SceneRendererProps & { route: RoutesType }
  ) => {
    switch (sceneRenderProps.route.key) {
      case ROUTE.ABOUT:
        return <TabAbout />;
      case ROUTE.STATS:
        return <TabStats />;
      case ROUTE.EVOLUTION:
        return <TabEvolution />;
      case ROUTE.MOVES:
        return <TabMoves />;
      case ROUTE.ENTRIES:
        return <TabEntries />;
      default:
        return null;
    }
  };
  return (
    <TabViewComponent
      renderScene={renderScene}
      routesProps={pokemonInfoRoutes}
      sceneContainerStyle={{
        paddingHorizontal: scale(12),
        paddingVertical: scale(12),
      }}
      activeColor={props.activeColor}
    />
  );
};

export default TabViewPokemonInfo;
