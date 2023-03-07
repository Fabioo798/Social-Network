import jwt from 'jsonwebtoken';
import { Request } from 'express';

export interface TokenPayload extends jwt.JwtPayload {
  id: string;
  email: string;
  role: string;
}

export interface RequestPlus extends Request {
  info?: TokenPayload;
}

export interface Repo<T> {
  query(): Promise<T[]>;
  queryId(id: string): Promise<T>;
  search(query: { key: string; value: unknown }): Promise<T[]>;
  create(info: Partial<T>): Promise<T>;
  update(info: Partial<T>): Promise<T>;
  destroy(id: string): Promise<void>;
}
