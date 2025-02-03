import {
  createNavigationContainerRef,
  StackActions,
} from "@react-navigation/native";
import { CombineStackParamList, RootStackParamList } from "@/navigator/Routes";

const navigationRef = createNavigationContainerRef<CombineStackParamList>();

const reset = <RouteName extends keyof CombineStackParamList>(
  screen: RouteName,
  params?: CombineStackParamList[RouteName]
) => {
  if (navigationRef.current && navigationRef.current.isReady()) {
    navigationRef.current.reset({
      index: 0,
      routes: [{ name: screen, params }],
    });
  }
};

const navigate = <
  RouteStack extends keyof RootStackParamList,
  RouteName extends keyof CombineStackParamList
>(
  stack: RouteStack,
  screen: RouteName,
  params?: CombineStackParamList[RouteName]
) => {
  const navigation = navigationRef.current;
  if (navigation && navigation.isReady()) {
    // @ts-ignore
    navigation.navigate(`${stack}`, { screen: screen, params: params });
  }
};

const replace = <RouteName extends keyof CombineStackParamList>(
  screen: RouteName,
  params?: CombineStackParamList[RouteName]
) => {
  if (navigationRef.current && navigationRef.current.isReady()) {
    navigationRef.current.dispatch(StackActions.replace(screen, params));
  }
};

const goBack = () => {
  if (navigationRef.current && navigationRef.current.isReady()) {
    navigationRef.current.goBack();
  }
};

const push = <RouteName extends keyof CombineStackParamList>(
  screen: RouteName,
  params?: CombineStackParamList[RouteName]
) => {
  if (navigationRef.current && navigationRef.current.isReady()) {
    navigationRef.current.dispatch(StackActions.push(screen, params));
  }
};

const pop = (count: number) => {
  if (navigationRef.current && navigationRef.current.isReady()) {
    navigationRef.current.dispatch(StackActions.pop(count));
  }
};

const getCurrentRoute = () => {
  const state = navigationRef.current?.getRootState();
  let currentRoute: { screen_name: string; screen_class: string };
  currentRoute = {
    screen_name: state?.routes[state.index]?.name || "",
    screen_class: state?.routes[state.index]?.name || "",
  };
  return currentRoute;
};

const NAVIGATION = {
  goBack,
  push,
  navigate,
  reset,
  getCurrentRoute,
  replace,
  pop,
};

export { navigationRef, NAVIGATION };
