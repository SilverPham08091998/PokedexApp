import { Platform, StatusBar } from "react-native";
import {
  hasNotch,
  height as DeviceHeight,
  width as DeviceWidth,
} from "react-native-utils-scale";

export const StatusBarHeight = Platform.select({
  ios: hasNotch ? 44 : 20,
  android: StatusBar.currentHeight,
  default: 0,
});

export const DEVICE_WIDTH = DeviceWidth;
export const DEVICE_HEIGHT = DeviceHeight;

export const TIME_LIMIT = 60;
