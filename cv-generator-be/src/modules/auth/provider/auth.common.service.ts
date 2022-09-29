import { Injectable } from '@nestjs/common';
import { ERoleName } from 'src/shared/type';
import { IJwtPayload } from '../auth0.type';
const jwt = require('jsonwebtoken');

@Injectable()
export class AuthCommonService {
  async decodeJWTToken(accessToken: string) {
    return jwt.decode(accessToken) as IJwtPayload | null;
  }

  getToken({ userId, role }: { role: ERoleName; userId: string }) {
    const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    return token;
  }
}
