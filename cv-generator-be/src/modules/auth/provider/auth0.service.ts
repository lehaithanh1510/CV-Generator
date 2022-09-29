import { config } from 'dotenv';
config();
import { HttpException, Injectable } from '@nestjs/common';
import { ERoleName } from 'src/shared/type';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { IAuth0SignupResponse, IAuth0SuccessfulResult } from '../auth0.type';

@Injectable()
export class Auth0Service {
  private auth0: AxiosInstance;

  constructor() {
    this.auth0 = axios.create({ baseURL: process.env.AUTH0_API_URL });
    this.auth0.interceptors.request.use((config: AxiosRequestConfig) => {
      // Add client id and secret to body
      config.data.client_id = process.env.AUTH0_CLIENT_ID;
      config.data.client_secret = process.env.AUTH0_CLIENT_SECRET;
      return config;
    });
  }

  async authorizeCredentials(email: string, password: string, role: ERoleName) {
    try {
      const { data } = await this.auth0.post<IAuth0SuccessfulResult>(
        '/oauth/token',
        {
          grant_type: 'password',
          username: email,
          password,
          audience: role,
        },
      );

      return data;
    } catch (err) {
      throw new HttpException(
        { ...err.response.data },
        err.response.data.statusCode,
      );
    }
  }

  async registerWithEmailAndPassword(email: string, password: string) {
    try {
      const { data } = await this.auth0.post<IAuth0SignupResponse>(
        '/dbconnections/signup',
        {
          email,
          password,
          connection: 'Username-Password-Authentication',
        },
      );

      return data;
    } catch (err) {
      throw new HttpException(
        { ...err.response.data },
        err.response.data.statusCode,
      );
    }
  }
}
