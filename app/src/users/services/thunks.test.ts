import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "../reducer/slice";
import {
 asyncEditProfile,
 asyncLoadUsers,
 asyncLogin,
 asyncRegister,
} from "./thunks";
import {
 EDIT_PROFILE_USER,
 GET_ALL_USERS,
 LOGIN_USER,
 REGISTER_USER,
} from "../model/url.model";
import axios from "axios";
import { mockLoginUser, token } from "../../utils/mocks";

const password = "test";
// import users from "../component/users/users";
jest.mock("axios", () => ({
 get: jest.fn(),
 post: jest.fn(),
 patch: jest.fn(),
}));

describe("Given asyncload user function", () => {
 describe("When is it called", () => {
  test("Then should make an http request and return the users", async () => {
   const getSpy = jest.spyOn(axios, "get").mockResolvedValueOnce({
    data: {
     results: [],
    },
   });
   const store = configureStore({
    reducer: {
     users: reducer,
    },
   });
   await store.dispatch(asyncLoadUsers(token));
   expect(getSpy).toHaveBeenCalledWith(GET_ALL_USERS, {
    headers: {
     Authorization: "Bearer " + token,
    },
   });

   const state = store.getState();
   expect(state.users.users).toEqual([]);
  });
 });
 describe("When is it called but rejected", () => {
  test("Then should return error", async () => {
   const getSpy = jest.spyOn(axios, "get").mockResolvedValueOnce(new Error());
   const store = configureStore({
    reducer: {
     users: reducer,
    },
   });
   await store.dispatch(asyncLoadUsers(token));
   expect(getSpy).toHaveBeenCalledWith(GET_ALL_USERS, {
    headers: {
     Authorization: "Bearer " + token,
    },
   });

   const state = store.getState();
   expect(state.users.LoadingUserStatus).toEqual("error");
  });
 });
});

describe("Given asyncRegister function", () => {
 describe("When is it called", () => {
  test("Then it should make an http request and register the user", async () => {
   const postSpy = jest.spyOn(axios, "post").mockResolvedValueOnce({
    data: {
     results: {},
    },
   });
   const store = configureStore({
    reducer: {
     users: reducer,
    },
   });
   await store.dispatch(
    asyncRegister({
     name: "test1",
     email: "test@test",
     password: password,
    })
   );
   expect(postSpy).toHaveBeenCalledWith(
    REGISTER_USER,
    {
     name: "test1",
     email: "test@test",
     password: password,
    },
    { headers: { "Content-Type": "application/json" } }
   );
   store.getState();
  });
 });
 describe("When is it called but rejected", () => {
  test("Then it should make an http request and return error", async () => {
   const postSpy = jest.spyOn(axios, "post").mockResolvedValueOnce(new Error());
   const store = configureStore({
    reducer: {
     users: reducer,
    },
   });
   await store.dispatch(
    asyncRegister({
     name: "test1",
     email: "test@test",
     password: password,
    })
   );
   expect(postSpy).toHaveBeenCalledWith(
    REGISTER_USER,
    {
     name: "test1",
     email: "test@test",
     password: password,
    },
    { headers: { "Content-Type": "application/json" } }
   );
   store.getState();
  });
 });
});

describe("Given asyncLogin function", () => {
 describe("When is it called", () => {
  test("Then it should make an http request and login the user", async () => {
   const postSpy = jest.spyOn(axios, "post").mockResolvedValueOnce({
    data: {
     results: {
      token: "",
      data: "",
     },
    },
   });
   const store = configureStore({
    reducer: {
     users: reducer,
    },
   });
   await store.dispatch(
    asyncLogin({
     email: "test@test",
     password: password,
    })
   );
   expect(postSpy).toHaveBeenCalledWith(
    LOGIN_USER,
    {
     email: "test@test",
     password: password,
    },
    { headers: { "Content-Type": "application/json" } }
   );
   const state = store.getState();
   expect(state.users.userLogged).toEqual({
    token: "",
    data: "",
   });
  });
 });
 describe("When is it called and rejected", () => {
  test("Then it should make an http request and return error", async () => {
   const postSpy = jest.spyOn(axios, "post").mockResolvedValueOnce(new Error());
   const store = configureStore({
    reducer: {
     users: reducer,
    },
   });
   await store.dispatch(
    asyncLogin({
     email: "test@test",
     password: password,
    })
   );
   expect(postSpy).toHaveBeenCalledWith(
    LOGIN_USER,
    {
     email: "test@test",
     password: password,
    },
    { headers: { "Content-Type": "application/json" } }
   );
   store.getState();
  });
 });
});

describe("Given editProfile function", () => {
 describe("When is it called", () => {
  test("Then it should make an http request and edit the user datas", async () => {
   const patchSpy = jest.spyOn(axios, "patch").mockResolvedValueOnce({
    data: {
     results: {},
    },
   });
   const store = configureStore({
    reducer: {
     users: reducer,
    },
   });
   await store.dispatch(
    asyncEditProfile({
     email: "test@test",
     password: password,
    })
   );
   expect(patchSpy).toHaveBeenCalledWith(EDIT_PROFILE_USER, mockLoginUser, {
    headers: {
     Authorization: "Bearer " + mockLoginUser.token,
     "Content-type": "application/json",
    },
   });
   store.getState();
  });
 });
 describe("When is it called but rejected", () => {
  test("Then it should make an http request and return error", async () => {
   const patchSpy = jest
    .spyOn(axios, "patch")
    .mockResolvedValueOnce(new Error());
   const store = configureStore({
    reducer: {
     users: reducer,
    },
   });
   await store.dispatch(
    asyncEditProfile({
     email: "test@test",
     password: password,
    })
   );
   expect(patchSpy).toHaveBeenCalledWith(EDIT_PROFILE_USER, mockLoginUser, {
    headers: {
     Authorization: "Bearer " + mockLoginUser.token,
     "Content-type": "application/json",
    },
   });
   store.getState();
  });
 });
});
