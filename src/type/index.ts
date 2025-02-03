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
