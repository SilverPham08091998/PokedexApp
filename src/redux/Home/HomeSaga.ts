import { all, call, Effect, put, takeLatest } from "redux-saga/effects";
import { HOME_ACTION } from "@/redux/Home/HomeAction";
import { API, UtilApi } from "@/api";
import {
  ListPokedex,
  PayloadActionType,
  PokemonInfo,
  ResourceLink,
} from "@/type";
import { REDUX_ACTION } from "@/redux";
import { invoke } from "@/redux/excute";
import axios, { AxiosResponse } from "axios";

const HomeSaga = function* watchHome() {
  yield all([takeLatest(HOME_ACTION.GET_POKEDEX, handleGetPokedex)]);
};

function* handleGetPokedex(action: PayloadActionType<number>) {
  const api = () => {
    return UtilApi.request<ListPokedex>({
      url: API.LIST_POKEDEX,
      method: "GET",
      params: { limit: action.payload },
    });
  };
  const execution = function* (): Generator<Effect, void, any> {
    const response: ListPokedex = yield call(api);
    if (response?.results) {
      const fetchPokedexData = async (results: Array<ResourceLink>) => {
        return await Promise.all(
          results.map(async (item: ResourceLink) => {
            const responseInfo: AxiosResponse<PokemonInfo> = await axios(
              item.url
            );
            return {
              ...responseInfo.data,
              name: responseInfo.data.name.toUpperCase(),
            };
          })
        );
      };
      const pokedexResult: Array<PokemonInfo> = yield call(
        fetchPokedexData,
        response.results
      );
      yield put({
        type: REDUX_ACTION.HOME_ACTION.GET_POKEDEX_SUCCESS,
        payload: pokedexResult,
      });
    }
  };
  yield* invoke(
    execution,
    REDUX_ACTION.HOME_ACTION.GET_POKEDEX_FAILED,
    () => action.callback && action.callback()
  );
}

export default HomeSaga;
