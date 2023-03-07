import mongoose from 'mongoose';
import { config } from '../config.js';

const { pass, cluster, dbname } = config;

export const dbConnect = () => {
  const uri = `mongodb+srv://fabiodn798:${pass}@${cluster}/${dbname}?retryWrites=true&w=majority`;
  return mongoose.connect(uri);
};
