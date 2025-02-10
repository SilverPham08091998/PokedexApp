import { ResourceLink, RoutesType } from "@/type";

export enum ROUTE {
  ABOUT = "ABOUT",
  STATS = "STATS",
  EVOLUTION = "EVOLUTION",
  MOVES = "MOVES",
  ENTRIES = "ENTRIES",
  FORMS = "FORMS",
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
  {
    key: ROUTE.ENTRIES,
    title: "Entries",
    disable: false,
    index: 4,
  },
  {
    key: ROUTE.FORMS,
    title: "Forms",
    disable: false,
    index: 5,
  },
];

export const MORE_ITEM: ResourceLink = {
  name: "More",
  url: "",
};
