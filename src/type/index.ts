import { ListPokedex, PokemonInfo, ResourceLink } from "@/type/PokemonInfo";
import { PokemonSpecies } from "@/type/PokemonSpecies";
import { PokemonTypeColors } from "@/type/PokemonType";
import { Item } from "./Item";
import { EvolutionChain } from "./PokemonEvolutionChain";

export interface ApiSuccessResponse<T> {
  success: boolean;
  code: number;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  statusCode: number;
  error: string;
  message: string;
  path: string;
  metaData: any;
  timestamp: Date;
  trace: string;
}

export const HttpMethod = {
  POST: "POST",
  GET: "GET",
  DELETE: "DELETE",
  PUT: "PUT",
};

export interface BaseOption {
  value: string | number;
  label: string;
}

export interface UserProfileType {
  fullName: string;
  firstName: string;
  lastName: string;
  middleName: string;
  gender: Gender;
  birthday: Date;
  nationalIdType: string;
  nationalId: string;
  nationalIdIssueDate: Date;
  nationalIdIssuer: number;
  nationalIdIssuerDesc: string;
  phoneNumberFirst: string;
  phoneNumberSecond?: string;
  email: string;
  userId: string;
  fileId: number;
  resourceUrl: string;
}

export enum Gender {
  MALE = "M",
  FEMALE = "F",
  OTHER = "O",
}

export interface RoutesType {
  key: string;
  title: string;
  disable: boolean;
  index: number;
}

export interface PaginationType<T> {
  list: Array<T>;
  totalPage?: number;
  currentPage?: number;
  size?: number;
  totalItem?: number;
  totalItemPerPage?: number;
  isPrevious?: boolean;
  isNext?: boolean;
}

export interface PayloadActionType<T> {
  type: string;
  payload: T;
  id?: number | string;
  callback?: () => void;
  isShowLoading?: boolean;
}

export type {
  PokemonInfo,
  PokemonSpecies,
  ListPokedex,
  ResourceLink,
  EvolutionChain,
  Item,
};
export { PokemonTypeColors };
