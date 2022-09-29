import { ERoleName } from 'src/shared/type';

export interface IAuth0PublicKeys {
  keys: IAuth0PublicKey[];
}

interface IAuth0PublicKey {
  alg: string;
  e: string;
  kid: string;
  kty: 'RSA';
  n: string;
  use: string;
}

export interface IJwtHeader {
  kid: string;
  typ: string;
  alg: string;
}

export interface IJwtPayload {
  sub: string; // auth0UserId
  iss?: string;
  aud: ERoleName; // role
  iat?: number;
  exp?: number;
  azp: string;
  gty: string;
}

export interface IAuth0AuthorizeResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface IAuth0SignupResponse {
  _id: string;
  email_verified: boolean;
  email: string;
  username: string;
  given_name: string;
  family_name: string;
  name: string;
  nickname: string;
  picture: string;
}

export interface IAuth0SuccessfulResult {
  access_token: string;
  refresh_token: string;
  token_type: string;
}
