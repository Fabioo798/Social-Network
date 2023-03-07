import { config } from '../config.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TokenPayload } from '../interfaces/interfaces.js';



const salt = 10;



export class Auth {
  static createJWT(payload: TokenPayload) {
    return jwt.sign(payload, config.jwtsecret as string);
  }

  static verifyJWTgettingPayload(token: string): TokenPayload {
    const result = jwt.verify(token, config.jwtsecret as string);
    if (typeof result === 'string') throw new Error(result);
    return result as TokenPayload;
  }

  static hash(value: string) {
    return bcrypt.hash(value, salt);
  }

  static compare(value: string, hash: string) {
    return bcrypt.compare(value, hash);
  }
}
