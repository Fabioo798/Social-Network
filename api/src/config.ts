import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

export const config = {
  user: process.env.USERNAME,
  pass: process.env.PASSWORD,
  cluster: process.env.CLUSTER,
  dbname: process.env.NAME,
  jwtsecret: process.env.SECRET,
};

export const __dirname = path.dirname(fileURLToPath(import.meta.url));
