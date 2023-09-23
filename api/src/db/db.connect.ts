import mongoose from 'mongoose';
import { config } from '../config.js';

const { pass, cluster } = config;

export const dbConnect = () => {
 const uri = `mongodb+srv://fabiodn798:${pass}@${cluster}/CH5W7?retryWrites=true&w=majority`;
 return mongoose.connect(uri);
};
