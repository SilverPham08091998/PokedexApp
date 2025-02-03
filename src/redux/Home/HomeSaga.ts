import { all, takeLatest } from "redux-saga/effects";
import { HOME_ACTION } from "@/redux/Home/HomeAction";

const HomeSaga = function* watchHome() {
  yield all([takeLatest(HOME_ACTION.GET_ACCESS_TOKEN, handleGetAccessToken)]);
};

function* handleGetAccessToken() {}

export default HomeSaga;
