import { useWindowDimensions, View, ViewStyle } from "react-native";
import { GET_COLORS } from "@/theme";
import { scale } from "react-native-utils-scale";
import {
  SceneRendererProps,
  TabBar,
  TabBarItem,
  TabView,
} from "react-native-tab-view";
import { CText } from "@/components";
import React, { useEffect } from "react";
import { RoutesType } from "@/type";
import { NavigationState } from "react-native-tab-view/lib/typescript/src/types";

interface Props {
  renderScene: (
    props: SceneRendererProps & { route: RoutesType }
  ) => React.ReactNode;
  routesProps: Array<RoutesType>;
  lazy?: boolean;
  swipeEnabled?: boolean;
  renderLazyPlaceholder?: () => React.ReactNode;
  sceneContainerStyle?: ViewStyle;
  renderTabBar?: (
    props: SceneRendererProps & {
      navigationState: NavigationState<RoutesType>;
    }
  ) => React.ReactNode;
  indexDefault?: number;
}

const TabViewComponent = (props: Props) => {
  const {
    routesProps,
    renderScene,
    lazy = true,
    swipeEnabled = false,
    sceneContainerStyle = {},
    renderLazyPlaceholder,
    renderTabBar,
    indexDefault,
  } = props;
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState<number>(indexDefault || 0);
  const [routes, setRoutes] = React.useState<Array<RoutesType>>([]);

  useEffect(() => {
    setRoutes(routesProps);
  }, [routesProps]);
  useEffect(() => {
    indexDefault && setIndex(indexDefault);
  }, [indexDefault]);

  return (
    <TabView
      lazy={lazy}
      swipeEnabled={swipeEnabled}
      navigationState={{ index, routes }}
      renderLazyPlaceholder={() =>
        renderLazyPlaceholder ? (
          renderLazyPlaceholder()
        ) : (
          <View style={{ flex: 1, backgroundColor: GET_COLORS().WHITE }} />
        )
      }
      renderScene={(sceneRendererProps) => {
        return (
          <View
            style={{
              flex: 1,
              paddingVertical: scale(24),
              paddingHorizontal: scale(24),
              backgroundColor: GET_COLORS().WHITE,
              ...sceneContainerStyle,
            }}
          >
            {renderScene(sceneRendererProps)}
          </View>
        );
      }}
      onIndexChange={(i) => setIndex(i)}
      initialLayout={{ width: layout.width }}
      renderTabBar={(tabBarProps) => {
        if (renderTabBar) {
          return renderTabBar(tabBarProps);
        }
        return (
          <TabBar
            {...tabBarProps}
            scrollEnabled={true}
            style={{
              backgroundColor: GET_COLORS().WHITE,
              paddingHorizontal: scale(4),
            }}
            renderLabel={(scene) => {
              return (
                <CText
                  color={
                    scene.focused ? GET_COLORS().PRIMARY : GET_COLORS().BLACK_4
                  }
                  textAlign={"center"}
                >
                  {scene.route.title}
                </CText>
              );
            }}
            renderTabBarItem={(tabBarItemProps) => {
              return <TabBarItem {...tabBarItemProps} />;
            }}
            indicatorStyle={{
              backgroundColor: GET_COLORS().PRIMARY,
            }}
            onTabPress={({ route, preventDefault }) => {
              if (route.disable) {
                preventDefault();
              }
            }}
          />
        );
      }}
    />
  );
};

export default React.memo(TabViewComponent);
