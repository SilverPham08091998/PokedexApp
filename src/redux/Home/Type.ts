export interface HomeInitialStateType {
  accessToken: string;
  refreshToken: string;
  userName: string;
}

export interface HomeGetAccessTokenType {
  password: string;
  userName: string;
}
