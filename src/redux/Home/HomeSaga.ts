import { all, call, Effect, put, takeLatest } from "redux-saga/effects";
import { HOME_ACTION } from "@/redux/Home/HomeAction";
import { UtilApi } from "@/api";
import {
  EvolutionChain,
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
import { TypePokemon } from "@/type/PokemonType";

const HomeSaga = function* watchHome() {
  yield all([
    takeLatest(HOME_ACTION.GET_POKEDEX, handleGetPokedex),
    takeLatest(HOME_ACTION.GET_POKEMON_INFO, handleGetPokemonInfo),
    takeLatest(HOME_ACTION.GET_VERSION_POKEMON, handleVersionPokemon),
    takeLatest(HOME_ACTION.GET_POKEMON_TYPE, handlePokemonType),
    takeLatest(HOME_ACTION.GET_POKEMON_TYPE_INFO, handleGetTypeInfo),
    takeLatest(HOME_ACTION.GET_POKEMON_MOVE_INFO, handleGetMoveInfo),
  ]);
};

function* handleVersionPokemon() {
  const api = () => {
    return UtilApi.request<ListCommon>({
      domain: `https://pokeapi.co/api/v2/version-group?offset=0&limit=1000`,
      method: "GET",
    });
  };
  const execution = function* (): Generator<Effect, void, any> {
    const response: ListCommon = yield call(api);
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
  yield* invoke(execution, REDUX_ACTION.HOME_ACTION.GET_VERSION_POKEMON_FAILED);
}

function* handlePokemonType() {
  const api = () => {
    return UtilApi.request<ListCommon>({
      domain: `https://pokeapi.co/api/v2/type?limit=1000`,
      method: "GET",
    });
  };
  const execution = function* (): Generator<Effect, void, any> {
    const response: ListCommon = yield call(api);
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
  yield* invoke(execution, REDUX_ACTION.HOME_ACTION.GET_POKEMON_TYPE_FAILED);
}

function* handleGetPokedex(action: PayloadActionType<string>) {
  const api = () => {
    return UtilApi.request<ListCommon>({
      domain: action.payload,
      method: "GET",
    });
  };
  const execution = function* (): Generator<Effect, void, any> {
    const response: ListCommon = yield call(api);
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
      yield put({
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
    const fetchAllPokemon = async (pokemons: Array<TypePokemon>) => {
      return await Promise.all(
        pokemons.map(async (pokemon: TypePokemon) => {
          const res = await UtilApi.request<PokemonInfo>({
            domain: pokemon.pokemon.url,
            method: "GET",
          });
          return {
            ...res,
            name: res.name.toUpperCase(),
          };
        })
      );
    };
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
    const moves: Array<PokemonMove> = yield call(
      fetchAllMove,
      action.payload.moves
    );

    const pokemons: Array<PokemonInfo> = yield call(
      fetchAllPokemon,
      action.payload.pokemon
    );

    yield put({
      type: REDUX_ACTION.HOME_ACTION.GET_POKEMON_TYPE_INFO_SUCCESS,
      payload: {
        info: action.payload,
        moves: moves,
        pokemons: pokemons,
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

    const learnedByPokemons: Array<PokemonInfo> = yield call(
      fetchAllPokemon,
      action.payload.learned_by_pokemon
    );

    yield put({
      type: REDUX_ACTION.HOME_ACTION.GET_POKEMON_MOVE_INFO_SUCCESS,
      payload: {
        info: action.payload,
        learnedByPokemon: learnedByPokemons,
      },
    });
  };
  yield* invoke(
    execution,
    REDUX_ACTION.HOME_ACTION.GET_POKEMON_MOVE_INFO_FAILED,
    () => action.callback && action.callback()
  );
}

export default HomeSaga;
