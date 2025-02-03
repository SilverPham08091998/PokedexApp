import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/core";
import { Provider } from "react-redux";
import React from "react";
import { StatusBar, View } from "react-native";
import Navigator from "./src/navigator";
import { I18nextProvider } from "react-i18next";
import i18next from "./src/util/language";
import {
  GlobalLoading,
  globalLoadingRef,
  GlobalMessage,
  globalMessageRef,
} from "@/components";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={"transparent"} barStyle={"dark-content"} />
        <I18nextProvider i18n={i18next}>
          <Provider store={store}>
            <PersistGate persistor={persistor} loading={null}>
              <GlobalMessage ref={globalMessageRef} />
              <GlobalLoading ref={globalLoadingRef} />
              <Navigator />
            </PersistGate>
          </Provider>
        </I18nextProvider>
      </View>
    </GestureHandlerRootView>
  );
};

export default App;
