import { COLORS_DARK } from "@/theme";

export interface AppStateInitialType {
  theme: typeof COLORS_DARK;
  language: string;
  loading: boolean;
  isConnected: boolean;
}
