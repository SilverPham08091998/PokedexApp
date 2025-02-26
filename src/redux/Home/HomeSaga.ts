import { all, call, Effect, put, select, takeLatest } from "redux-saga/effects";
import { HOME_ACTION } from "@/redux/Home/HomeAction";
import { UtilApi } from "@/api";
import {
  EvolutionChain,
  Item,
  ListCommon,
  PayloadActionType,
  PokemonInfo,
  PokemonMove,
  PokemonSpecies,
  PokemonType,
  ResourceLink,
} from "@/type";
import { REDUX_ACTION } from "@/redux";
import { invoke } from "@/redux/excute";
import { EvolutionNode } from "@/type/PokemonEvolutionChain";
import { Move } from "@/type/PokemonInfo";
import { MoveInfo } from "@/type/Move";
import { URL_CONVERTER } from "@/util/function";
import { HomeInitialStateType } from "@/redux/Home/Type";
import { getHomeReducer } from "@/redux/Home/HomeReducer";

const SIZE_PAGE = 20;
const HomeSaga = function* watchHome() {
  yield all([
    takeLatest(HOME_ACTION.GET_POKEDEX, handleGetPokedex),
    takeLatest(HOME_ACTION.GET_POKEMON_INFO, handleGetPokemonInfo),
    takeLatest(HOME_ACTION.GET_VERSION_POKEMON, handleVersionPokemon),
    takeLatest(HOME_ACTION.GET_POKEMON_TYPE, handlePokemonType),
    takeLatest(HOME_ACTION.GET_POKEMON_TYPE_INFO, handleGetTypeInfo),
    takeLatest(HOME_ACTION.GET_POKEMON_MOVE_INFO, handleGetMoveInfo),
    takeLatest(
      HOME_ACTION.GET_PAGE_LEARNT_BY_POKEMON,
      handleGetPageLearntByPokemon
    ),
    takeLatest(HOME_ACTION.GET_POKEMON_ITEM, handleGetPokemonItem),
    takeLatest(HOME_ACTION.GET_PAGE_MOVE_OF_TYPE, handleGetPageMoveOfType),
    takeLatest(
      HOME_ACTION.GET_PAGE_POKEMON_OF_TYPE,
      handleGetPagePokemonOfType
    ),
  ]);
};

function* handleVersionPokemon() {
  const api = () => {
    return UtilApi.request<ListCommon<ResourceLink>>({
      domain: `https://pokeapi.co/api/v2/version-group?offset=0&limit=1000`,
      method: "GET",
    });
  };
  const execution = function* (): Generator<Effect, void, any> {
    const response: ListCommon<ResourceLink> = yield call(api);
    if (response?.results) {
      yield put({
        type: REDUX_ACTION.HOME_ACTION.GET_VERSION_POKEMON_SUCCESS,
        payload: response.results.map((i) => {
          return {
            ...i,
            name: i.name.toUpperCase(),
          };
        }),
      });
    }
  };
  yield* invoke(
    execution,
    REDUX_ACTION.HOME_ACTION.GET_VERSION_POKEMON_FAILED,
    undefined,
    undefined,
    false
  );
}

function* handlePokemonType() {
  const api = () => {
    return UtilApi.request<ListCommon<ResourceLink>>({
      domain: `https://pokeapi.co/api/v2/type?limit=1000`,
      method: "GET",
    });
  };
  const execution = function* (): Generator<Effect, void, any> {
    const response: ListCommon<ResourceLink> = yield call(api);
    if (response?.results) {
      const fetchTypesInfo = async (results: Array<ResourceLink>) => {
        return await Promise.all(
          results.map(async (item: ResourceLink) => {
            const responseInfo: PokemonType =
              await UtilApi.request<PokemonType>({
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
      const types: Array<PokemonType> = yield call(
        fetchTypesInfo,
        response.results
      );
      yield put({
        type: REDUX_ACTION.HOME_ACTION.GET_POKEMON_TYPE_SUCCESS,
        payload: types,
      });
    }
  };
  yield* invoke(
    execution,
    REDUX_ACTION.HOME_ACTION.GET_POKEMON_TYPE_FAILED,
    undefined,
    undefined,
    false
  );
}

function* handleGetPokedex(action: PayloadActionType<string>) {
  const api = () => {
    return UtilApi.request<ListCommon<ResourceLink>>({
      domain: action.payload,
      method: "GET",
    });
  };
  const execution = function* (): Generator<Effect, void, any> {
    const response: ListCommon<PokemonInfo> = yield call(api);
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
      const queryParams: { limit: number; offset: number } =
        URL_CONVERTER.getQueryParams(action.payload);
      yield put<PayloadActionType<ListCommon<PokemonInfo>>>({
        type: REDUX_ACTION.HOME_ACTION.GET_POKEDEX_SUCCESS,
        payload: {
          ...response,
          page: queryParams.offset / queryParams.limit + 1,
          data: pokedexResult,
        },
      });
    }
  };
  yield* invoke(
    execution,
    REDUX_ACTION.HOME_ACTION.GET_POKEDEX_FAILED,
    () => action.callback && action.callback(),
    undefined,
    action.isShowLoading
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
    const fetchPokemonMove = async (request: Array<Move>) => {
      return await Promise.all(
        request.map(async (item: Move) => {
          const responseInfo: MoveInfo = await UtilApi.request<MoveInfo>({
            domain: item.move.url,
            method: "GET",
          });
          return {
            move: {
              ...responseInfo,
              name: responseInfo?.name.toUpperCase(),
            },
            version_group_details: item.version_group_details,
          };
        })
      );
    };
    const pokemonMoves: Array<PokemonMove> = yield call(
      fetchPokemonMove,
      action.payload.moves
    );
    const responseEvolution: EvolutionChain = yield call(fetchEvolution);

    yield call(fetchAllChainPokemonInfo, responseEvolution.chain);

    yield put({
      type: REDUX_ACTION.HOME_ACTION.GET_POKEMON_INFO_SUCCESS,
      payload: {
        species: responseSpecies,
        info: action.payload,
        evolution: responseEvolution,
        moves: pokemonMoves,
      },
    });
  };
  yield* invoke(
    execution,
    REDUX_ACTION.HOME_ACTION.GET_POKEMON_INFO_FAILED,
    () => action.callback && action.callback()
  );
}

function* handleGetTypeInfo(action: PayloadActionType<PokemonType>) {
  const execution = function* (): Generator<Effect, void, any> {
    const { typeInfo }: HomeInitialStateType = yield select(getHomeReducer);
    const newPageMoves = yield call(getPageMoveInfo, 1, {
      ...typeInfo.moves,
      results: action.payload.moves.map((i) => i),
    });
    const newPagePokemons: ListCommon<PokemonInfo> = yield call(
      getPagePokemonInfo,
      1,
      {
        ...typeInfo.pokemons,
        results: action.payload.pokemon.map((i) => i.pokemon),
      }
    );

    yield put({
      type: REDUX_ACTION.HOME_ACTION.GET_POKEMON_TYPE_INFO_SUCCESS,
      payload: {
        info: action.payload,
        moves: {
          ...newPageMoves,
        },
        pokemons: {
          ...newPagePokemons,
        },
      },
    });
  };
  yield* invoke(
    execution,
    REDUX_ACTION.HOME_ACTION.GET_POKEMON_TYPE_INFO_FAILED,
    () => action.callback && action.callback()
  );
}

function* handleGetMoveInfo(action: PayloadActionType<MoveInfo>) {
  const execution = function* (): Generator<Effect, void, any> {
    const { moveInfo }: HomeInitialStateType = yield select(getHomeReducer);
    const newPagePokemon = yield call(getPagePokemonInfo, 1, {
      ...moveInfo.learnedByPokemon,
      results: action.payload.learned_by_pokemon.map((i) => i),
    });

    yield put({
      type: REDUX_ACTION.HOME_ACTION.GET_POKEMON_MOVE_INFO_SUCCESS,
      payload: {
        ...moveInfo,
        learnedByPokemon: {
          ...newPagePokemon,
        },
        info: action.payload,
      },
    });
  };
  yield* invoke(
    execution,
    REDUX_ACTION.HOME_ACTION.GET_POKEMON_MOVE_INFO_FAILED,
    () => action.callback && action.callback()
  );
}

function* handleGetPagePokemonOfType(action: PayloadActionType<number>) {
  const execution = function* (): Generator<Effect, void, any> {
    const { typeInfo }: HomeInitialStateType = yield select(getHomeReducer);
    const newPagePokemon = yield call(
      getPagePokemonInfo,
      action.payload,
      typeInfo.pokemons
    );

    yield put({
      type: REDUX_ACTION.HOME_ACTION.GET_PAGE_POKEMON_OF_TYPE_SUCCESS,
      payload: {
        ...typeInfo,
        pokemons: {
          ...newPagePokemon,
        },
      },
    });
  };
  yield* invoke(
    execution,
    REDUX_ACTION.HOME_ACTION.GET_PAGE_POKEMON_OF_TYPE_FAILED,
    () => action.callback && action.callback()
  );
}

function* handleGetPageMoveOfType(action: PayloadActionType<number>) {
  const execution = function* (): Generator<Effect, void, any> {
    const { typeInfo }: HomeInitialStateType = yield select(getHomeReducer);
    const newPageMoves = yield call(
      getPageMoveInfo,
      action.payload,
      typeInfo.moves
    );

    yield put({
      type: REDUX_ACTION.HOME_ACTION.GET_PAGE_MOVE_OF_TYPE_SUCCESS,
      payload: {
        ...typeInfo,
        moves: {
          ...newPageMoves,
        },
      },
    });
  };
  yield* invoke(
    execution,
    REDUX_ACTION.HOME_ACTION.GET_PAGE_MOVE_OF_TYPE_FAILED,
    () => action.callback && action.callback()
  );
}

function* handleGetPageLearntByPokemon(action: PayloadActionType<number>) {
  const execution = function* (): Generator<Effect, void, any> {
    const { moveInfo }: HomeInitialStateType = yield select(getHomeReducer);
    const newPagePokemons = yield call(
      getPagePokemonInfo,
      action.payload,
      moveInfo.learnedByPokemon
    );

    yield put({
      type: REDUX_ACTION.HOME_ACTION.GET_PAGE_LEARNT_BY_POKEMON_SUCCESS,
      payload: {
        ...moveInfo,
        learnedByPokemon: {
          ...newPagePokemons,
        },
      },
    });
  };
  yield* invoke(
    execution,
    REDUX_ACTION.HOME_ACTION.GET_PAGE_LEARNT_BY_POKEMON_FAILED,
    () => action.callback && action.callback()
  );
}

function* handleGetPokemonItem(action: PayloadActionType<string>) {
  const api = () => {
    return UtilApi.request<ListCommon<ResourceLink>>({
      domain: action.payload,
      method: "GET",
    });
  };
  const execution = function* (): Generator<Effect, void, any> {
    const response: ListCommon<Item> = yield call(api);
    if (response?.results) {
      const fetchPokedexData = async (results: Array<ResourceLink>) => {
        return await Promise.all(
          results.map(async (item: ResourceLink) => {
            const responseInfo: Item = await UtilApi.request<Item>({
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
      const pokedexResult: Array<Item> = yield call(
        fetchPokedexData,
        response.results
      );
      const queryParams: { limit: number; offset: number } =
        URL_CONVERTER.getQueryParams(action.payload);
      yield put<PayloadActionType<ListCommon<Item>>>({
        type: REDUX_ACTION.HOME_ACTION.GET_POKEMON_ITEM_SUCCESS,
        payload: {
          ...response,
          page: queryParams.offset / queryParams.limit + 1,
          data: pokedexResult,
        },
      });
    }
  };
  yield* invoke(
    execution,
    REDUX_ACTION.HOME_ACTION.GET_POKEMON_ITEM_FAILED,
    () => action.callback && action.callback()
  );
}

const getPagePokemonInfo = async (
  page: number,
  previousList: ListCommon<PokemonInfo>
) => {
  const fetchAllPokemon = async (pokemons: Array<ResourceLink>) => {
    return await Promise.all(
      pokemons.map(async (pokemon: ResourceLink) => {
        const res = await UtilApi.request<PokemonInfo>({
          domain: pokemon.url,
          method: "GET",
        });
        return {
          ...res,
          name: res.name.toUpperCase(),
        };
      })
    );
  };

  if (!previousList?.results || previousList.results.length === 0) {
    return {
      data: [],
      page: 1,
      next: null,
      previous: null,
      results: [],
      count: 0,
    };
  }
  const totalPages = Math.ceil(previousList.results.length / SIZE_PAGE);
  const validPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (validPage - 1) * SIZE_PAGE;
  const endIndex = Math.min(
    startIndex + SIZE_PAGE,
    previousList.results.length
  );
  const pagePokemon = previousList.results.slice(startIndex, endIndex);
  const resPage: Array<PokemonInfo> = await fetchAllPokemon(pagePokemon);
  return {
    data: resPage,
    page: validPage,
    next: validPage < totalPages ? "Next page: " + (validPage + 1) : "",
    previous: validPage > 1 ? "Previous page: " + (validPage - 1) : "",
    results: previousList.results,
    count: previousList.results.length,
  };
};

const getPageMoveInfo = async (
  page: number,
  previousList: ListCommon<PokemonMove>
) => {
  const fetchAllMove = async (request: Array<ResourceLink>) => {
    return await Promise.all(
      request.map(async (item: ResourceLink) => {
        const responseInfo: MoveInfo = await UtilApi.request<MoveInfo>({
          domain: item.url,
          method: "GET",
        });
        return {
          move: {
            ...responseInfo,
            name: responseInfo?.name.toUpperCase(),
          },
          version_group_details: [],
        };
      })
    );
  };
  if (!previousList?.results || previousList.results.length === 0) {
    return {
      data: [],
      page: 1,
      next: null,
      previous: null,
      results: [],
      count: 0,
    };
  }
  const totalPages = Math.ceil(previousList.results.length / SIZE_PAGE);
  const validPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (validPage - 1) * SIZE_PAGE;
  const endIndex = Math.min(
    startIndex + SIZE_PAGE,
    previousList.results.length
  );
  const pageMove = previousList.results.slice(startIndex, endIndex);
  const resPage: Array<PokemonMove> = await fetchAllMove(pageMove);
  return {
    data: resPage,
    page: validPage,
    next: validPage < totalPages ? "Next page: " + (validPage + 1) : "",
    previous: validPage > 1 ? "Previous page: " + (validPage - 1) : "",
    results: previousList.results,
    count: previousList.results.length,
  };
};

export default HomeSaga;
