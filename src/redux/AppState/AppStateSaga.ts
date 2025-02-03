import { all, Effect, put, takeLatest } from "redux-saga/effects";
import { invoke } from "@/redux/excute";
import { REDUX_ACTION } from "@/redux";
import { NAVIGATION, SCREEN_NAME } from "@/util";

const AppStateSaga = function* watchAppState() {
  yield all([takeLatest(REDUX_ACTION.APP_STATE_ACTION.SET_UP_APP, setUp)]);
};

function* setUp() {
  const execution = function* (): Generator<Effect, void, any> {
    // Set up success
    yield put({
      type: REDUX_ACTION.APP_STATE_ACTION.SET_UP_APP_SUCCESS,
    });
  };
  yield* invoke(execution, REDUX_ACTION.APP_STATE_ACTION.SET_UP_APP_FAIL, () =>
    setTimeout(() => {
      NAVIGATION.reset(SCREEN_NAME.MAIN_STACK);
    }, 500)
  );
}

export default AppStateSaga;
