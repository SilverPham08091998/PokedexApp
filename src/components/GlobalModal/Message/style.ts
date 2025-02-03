import { StyleSheet } from "react-native";
import { scale } from "react-native-utils-scale";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  boxContent: {
    width: scale(270),
    backgroundColor: "#F2F2F2",
    borderRadius: scale(20),
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  title: {
    marginTop: scale(12),
  },
  message: {
    marginTop: scale(12),
  },
  button: {
    width: scale(100),
    height: scale(50),
  },
  separator: {
    marginTop: scale(16),
    width: scale(270),
    height: 1,
    backgroundColor: "#DEDEDF",
  },
});
