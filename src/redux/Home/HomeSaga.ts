import { all, call, Effect, put, takeLatest } from "redux-saga/effects";
import { HOME_ACTION } from "@/redux/Home/HomeAction";
import { UtilApi } from "@/api";
import {
  EvolutionChain,
  ListPokedex,
  PayloadActionType,
  PokemonInfo,
  PokemonSpecies,
  ResourceLink,
} from "@/type";
import { REDUX_ACTION } from "@/redux";
import { invoke } from "@/redux/excute";
import { EvolutionNode } from "@/type/PokemonEvolutionChain";

const HomeSaga = function* watchHome() {
  yield all([
    takeLatest(HOME_ACTION.GET_POKEDEX, handleGetPokedex),
    takeLatest(HOME_ACTION.GET_POKEMON_INFO, handleGetPokemonInfo),
  ]);
};

function* handleGetPokedex(action: PayloadActionType<number>) {
  const api = () => {
    return UtilApi.request<ListPokedex>({
      domain: `https://pokeapi.co/api/v2/pokemon?offset=785`,
      method: "GET",
      params: { limit: 50 },
    });
  };
  const execution = function* (): Generator<Effect, void, any> {
    const response: ListPokedex = yield call(api);
    if (response?.results) {
      const fetchPokedexData = async (results: Array<ResourceLink>) => {
        return await Promise.all(
          results.map(async (item: ResourceLink) => {
            const responseInfo: PokemonInfo =
              await UtilApi.request<PokemonInfo>({
                domain: item.url,
                method: "GET",
              });
            return {
              ...responseInfo,
              name: responseInfo.name.toUpperCase(),
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

function* handleGetPokemonInfo(action: PayloadActionType<PokemonInfo>) {
  const fetchSpecies = () => {
    return UtilApi.request<PokemonSpecies>({
      domain: action.payload.species.url,
      method: "GET",
    });
  };
  const execution = function* (): Generator<Effect, void, any> {
    const responseSpecies: PokemonSpecies = yield call(fetchSpecies);
    const fetchEvolution = () => {
      return UtilApi.request<EvolutionChain>({
        domain: responseSpecies.evolution_chain.url,
        method: "GET",
      });
    };
    const fetchAllChainPokemonInfo = async (node: EvolutionNode) => {
      node.pokemon = await UtilApi.request<PokemonInfo>({
        domain: `https://pokeapi.co/api/v2/pokemon/${node.species.name}`,
        method: "GET",
      });
      for (const evolution of node.evolves_to) {
        await fetchAllChainPokemonInfo(evolution);
      }
    };
    const responseEvolution: EvolutionChain = yield call(fetchEvolution);

    yield call(fetchAllChainPokemonInfo, responseEvolution.chain);

    yield put({
      type: REDUX_ACTION.HOME_ACTION.GET_POKEMON_INFO_SUCCESS,
      payload: {
        species: responseSpecies,
        info: action.payload,
        evolution: responseEvolution,
      },
    });
  };
  yield* invoke(
    execution,
    REDUX_ACTION.HOME_ACTION.GET_POKEMON_INFO_FAILED,
    () => action.callback && action.callback()
  );
}

export default HomeSaga;
