import dotenv from 'dotenv';

dotenv.config();

export const config = {
 user: process.env.USERNAME,
 pass: process.env.PASSWORD,
 cluster: process.env.CLUSTER,
 dbname: process.env.NAME,
 jwtsecret: process.env.SECRET,
};
