import { UserStructure } from "./user.model";

export type apiResponse = {
 results: UserStructure[];
};

export type loginData = {
 results: {
  token: string;
  data: UserStructure;
 };
};

export type loginCredential = {
 email: string;
 password: string;
};
export type registerCredential = {
 name: string;
 email: string;
 password: string;
 userPhoto?: File | null;
};
