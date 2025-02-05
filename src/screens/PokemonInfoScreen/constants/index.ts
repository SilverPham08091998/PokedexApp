import { RoutesType } from "@/type";

export enum ROUTE {
  ABOUT = "ABOUT",
  STATS = "STATS",
  EVOLUTION = "EVOLUTION",
  MOVES = "MOVES",
}

export const pokemonInfoRoutes: Array<RoutesType> = [
  {
    key: ROUTE.ABOUT,
    title: "About",
    disable: false,
    index: 0,
  },
  {
    key: ROUTE.STATS,
    title: "Stats",
    disable: false,
    index: 1,
  },

  {
    key: ROUTE.EVOLUTION,
    title: "Evolution",
    disable: false,
    index: 2,
  },
  {
    key: ROUTE.MOVES,
    title: "Moves",
    disable: false,
    index: 3,
  },
];
