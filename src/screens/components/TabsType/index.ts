import { RoutesType } from "@/type";

export enum ROUTE {
  INFO = "INFO",
  MOVES = "MOVES",
  POKEMONS = "POKEMONS",
}

export const typeRoutes: Array<RoutesType> = [
  {
    key: ROUTE.INFO,
    title: "Info",
    disable: false,
    index: 0,
  },
  {
    key: ROUTE.POKEMONS,
    title: "Pokemons",
    disable: false,
    index: 1,
  },

  {
    key: ROUTE.MOVES,
    title: "Moves",
    disable: false,
    index: 2,
  },
];
