export const HOME_ACTION = {
  GET_POKEDEX: "GET_POKEDEX",
  GET_POKEDEX_SUCCESS: "GET_POKEDEX_SUCCESS",
  GET_POKEDEX_FAILED: "GET_POKEDEX_FAILED",
};

export const getPokedex = (limit: number) => {
  return {
    type: HOME_ACTION.GET_POKEDEX,
    payload: limit,
  };
};
export const HomeAction = {
  getPokedex: getPokedex,
};
