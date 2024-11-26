import { createSlice } from "@reduxjs/toolkit";
import { asyncLoadUsers, asyncLogin, asyncRegister } from "../services/thunks";
import { UserStructure } from "../model/user.model";

export type status = "loading" | "complete" | "error" | "idle";

export type state = {
 userLoginStatus: status;
 userLogged: {
  token: string;
  data: UserStructure;
 } | null;
 LoadingUserStatus: status;
 users: UserStructure[];
 register: status;
};

export const initialState: state = {
 userLoginStatus: "idle",
 userLogged: null,
 LoadingUserStatus: "idle",
 users: [],
 register: 'idle'
};

const slice = createSlice({
 name: "user",
 initialState,
 reducers: {},
 extraReducers: (builder) => {
  builder.addCase(asyncLoadUsers.pending, (state, _action) => {
   state.LoadingUserStatus = "loading";
  });
  builder.addCase(asyncLoadUsers.fulfilled, (state, action) => {
   state.LoadingUserStatus = "complete";
   console.log(action.payload.results);
   state.users = action.payload.results;
  });
  builder.addCase(asyncLoadUsers.rejected, (state, _action) => {
   state.LoadingUserStatus = "error";
  });

  //login cases
  builder.addCase(asyncLogin.fulfilled, (state, action) => {
   state.userLoginStatus = "complete";
   state.userLogged = {
    token: action.payload.results.token,
    data: action.payload.results.data,
   };
   console.log(state.userLogged);
  });
  builder.addCase(asyncLogin.pending, (state, _action) => {
   state.userLoginStatus = "loading";
  });
  builder.addCase(asyncLogin.rejected, (state, _action) => {
   state.userLoginStatus = "error";
  });

  //register cases

  builder.addCase(asyncRegister.fulfilled, (state, action) => {
   state.register = 'complete';
  });
  builder.addCase(asyncRegister.pending, (state, _action) => {
     state.register = 'loading';
  });
  builder.addCase(asyncRegister.rejected, (state, _action) => {
     state.register = 'error';
  });
 },
});

export const { reducer } = slice;
