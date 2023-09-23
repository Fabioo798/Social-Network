import { createAsyncThunk } from "@reduxjs/toolkit";
import {
 EDIT_PROFILE_USER,
 GET_ALL_USERS,
 REGISTER_USER,
} from "../model/url.model";
import { UserStructure } from "../model/user.model";
import { apiResponse, loginData, loginCredential } from "../model/types";
import axios from "axios";

export const asyncLoadUsers = createAsyncThunk<apiResponse, string>(
 "user/loadUser",
 async (token) => {
  const resp = await axios.get(GET_ALL_USERS, {
   headers: {
    Authorization: "Bearer " + token,
   },
  });
  if (!resp.data)
   throw new Error("Error http: " + resp.status + resp.statusText);

  const users = resp.data as apiResponse;
  return users;
 }
); // Dispara un action que puede ser tres actiones, fulfilled, rejected, waiting

export const asyncLogin = createAsyncThunk<loginData, loginCredential>(
 "users/login",
 async (user) => {
  const url = GET_ALL_USERS + "login";
  const response = await axios.post(
   url,
   { email: user.email, password: user.password },
   { headers: { "Content-Type": "application/json" } }
  );
  if (!response.data) {
   throw new Error("Failed to login");
  }
  const data = response.data;
  return data;
 }
); // Dispara un action que puede ser tres actiones, fulfilled, rejected, waiting

export const asyncRegister = createAsyncThunk<
 apiResponse,
 { email: string; name: string; password: string }
>("users/register", async ({ name, email, password }) => {
 const url = REGISTER_USER;
 const response = await axios.post(
  url, // url
  { name, email, password }, // data
  { headers: { "Content-Type": "application/json" } } // config
 );
 console.log(response);
 if (!response.data) {
  throw new Error("Failed to register");
 }

 const data = response.data; // No need to await here as there's no promise
 return data;
});

export const asyncEditProfile = createAsyncThunk<
 UserStructure,
 Partial<UserStructure>
>("users/edit_user", async (User) => {
 const url = EDIT_PROFILE_USER;
 const response = await axios.patch(url, User, {
  headers: {
   Authorization: "Bearer " + User.token,
   "Content-type": "application/json",
  },
 });
 const data = (await response.data) as UserStructure;
 if (!data) {
  throw new Error("Failed to modify your datas");
 }
 return data;
});
