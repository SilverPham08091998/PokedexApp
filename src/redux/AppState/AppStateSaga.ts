import { all, Effect, put, take, takeLatest } from "redux-saga/effects";
import { invoke } from "@/redux/excute";
import { REDUX_ACTION } from "@/redux";
import { NAVIGATION, SCREEN_NAME } from "@/util";
import { PayloadActionType } from "@/type";

const AppStateSaga = function* watchAppState() {
  yield all([takeLatest(REDUX_ACTION.APP_STATE_ACTION.SET_UP_APP, setUp)]);
};

function* setUp() {
  const execution = function* (): Generator<Effect, void, any> {
    // Set up success
    yield put({
      type: REDUX_ACTION.APP_STATE_ACTION.SET_UP_APP_SUCCESS,
    });
    yield put<PayloadActionType<string>>({
      type: REDUX_ACTION.HOME_ACTION.GET_POKEDEX,
      payload: "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20",
      isShowLoading: false,
    });
    yield put<PayloadActionType<{}>>({
      type: REDUX_ACTION.HOME_ACTION.GET_VERSION_POKEMON,
      payload: {},
      isShowLoading: false,
    });
    yield put<PayloadActionType<{}>>({
      type: REDUX_ACTION.HOME_ACTION.GET_POKEMON_TYPE,
      payload: {},
      isShowLoading: false,
    });
    yield all([
      take(REDUX_ACTION.HOME_ACTION.GET_POKEDEX_SUCCESS),
      take(REDUX_ACTION.HOME_ACTION.GET_VERSION_POKEMON_SUCCESS),
      take(REDUX_ACTION.HOME_ACTION.GET_POKEMON_TYPE_SUCCESS),
    ]);
    yield put({
      type: REDUX_ACTION.APP_STATE_ACTION.SET_UP_APP_SUCCESS,
    });
  };
  yield* invoke(execution, REDUX_ACTION.APP_STATE_ACTION.SET_UP_APP_FAIL, () =>
    setTimeout(() => {
      NAVIGATION.reset(SCREEN_NAME.MAIN_STACK);
    }, 1000)
  );
}

export default AppStateSaga;
