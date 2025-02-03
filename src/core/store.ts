import createSagaMiddleware from "redux-saga";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReduxSaga, RootReducer } from "@/redux";
import { persistReducer, persistStore } from "redux-persist";
import { configureStore, MiddlewareArray } from "@reduxjs/toolkit";
import logger from "redux-logger";

const SagaMiddleware = createSagaMiddleware();

const rootPersistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["home"],
};

const FinalReducer = persistReducer(rootPersistConfig, RootReducer);

export const store = configureStore({
  reducer: FinalReducer,
  middleware: __DEV__
    ? new MiddlewareArray().concat(SagaMiddleware, logger)
    : [SagaMiddleware],
  enhancers: [],
});
export const persistor = persistStore(store);

SagaMiddleware.run(ReduxSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
