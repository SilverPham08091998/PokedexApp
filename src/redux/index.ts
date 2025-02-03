import { all, fork } from "redux-saga/effects";
import { combineReducers } from "redux";
import { HomeReducer, HomeSaga } from "./Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer } from "redux-persist";
import {
  APP_STATE_ACTION,
  AppStateAction,
  AppStateReducer,
  AppStateSaga,
} from "@/redux/AppState";

const homePersist = {
  key: "home",
  storage: AsyncStorage,
  whitelist: ["accessToken", "username"],
};
const RootReducer = combineReducers({
  home: persistReducer(homePersist, HomeReducer),
  appState: AppStateReducer,
});

const ReduxSaga = function* ReduxSaga() {
  yield all([fork(HomeSaga), fork(AppStateSaga)]);
};

const ReduxAction = {
  APP_STATE_ACTION: { ...AppStateAction },
};
const REDUX_ACTION = {
  APP_STATE_ACTION: { ...APP_STATE_ACTION },
};

export { ReduxSaga, RootReducer, REDUX_ACTION, ReduxAction };
