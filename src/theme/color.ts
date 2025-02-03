import { store } from "@/core";

const COLORS_LIGHT = {
  PRIMARY: "#109CF1",
  TRANSPARENT: "rgba(0,0,0,0)",
  BLACK_0: "#000000",
  BLACK_1: "#282F38",
  BLACK_2: "#444B53",
  BLACK_22: "#90A0B7",
  BLACK_3: "#707683",
  BLACK_4: "#ACB0B5",
  PLACEHOLDER: "#9EA3A8",
  WHITE: "#fff",
  BACKGROUND_GRAY: "#F7F8FA",
  TEXT_LINE: "#D3D8DD",
  RED: "#FA375A",
  ORANGE: "#FF6600",
  GREEN: "#0BC56B",
  LINE: "#EBEFF2",
  LINE_2: "#EDF1F6",
  LINE_3: "#808089",
  BORDER_1: "#E5E5E5",
  BORDER_3: "#DDDDE3",
  GRAY: "#E4E4E4",
  GRAY_1: "#F2F5F7",
  BORDER_2: "#2C3E50",
  PURPLE: "#743EF5",
  PURPLE_2: "#00529C",
  YELLOW: "#FFAE29",
  PRIMARY_LIGHT: "#C9FAFA",
  FRONT_WAVE_COLOR: "#53C8DA",
  BACK_WAVE_COLOR: "#7DDAE6",
};
const COLORS_DARK = {
  PRIMARY: "#109CF1",
  TRANSPARENT: "rgba(0,0,0,0)",
  BLACK_0: "#000000",
  BLACK_1: "#282F38",
  BLACK_2: "#444B53",
  BLACK_22: "#90A0B7",
  BLACK_3: "#707683",
  BLACK_4: "#ACB0B5",
  PLACEHOLDER: "#9EA3A8",
  WHITE: "#ffffff",
  BACKGROUND_GRAY: "#F7F8FA",
  TEXT_LINE: "#D3D8DD",
  RED: "#FA375A",
  ORANGE: "#FF6600",
  GREEN: "#0BC56B",
  LINE: "#EBEFF2",
  LINE_2: "#EDF1F6",
  BORDER_1: "#E5E5E5",
  GRAY: "#E4E4E4",
  GRAY_1: "#F2F5F7",
  BORDER_2: "#2C3E50",
  PURPLE: "#743EF5",
  PURPLE_2: "#00529C",
  YELLOW: "#FFAE29",
  PRIMARY_LIGHT: "#C9FAFA",
  FRONT_WAVE_COLOR: "#53C8DA",
  BACK_WAVE_COLOR: "#7DDAE6",
};

const GET_COLORS = () => {
  const { theme } = store.getState().appState;
  return theme ? theme : COLORS_LIGHT;
};
const rgba = (hex: string, opacity: number) => {
  const alpha = Math.round(opacity * 255);
  return `${hex}${alpha.toString(16).padStart(2, "0")}`;
};

export { COLORS_DARK, COLORS_LIGHT, GET_COLORS, rgba };
