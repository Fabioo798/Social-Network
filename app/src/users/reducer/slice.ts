import { createSlice } from "@reduxjs/toolkit";
import { asyncLoadUsers, asyncLogin, asyncRegister } from "../services/thunks";
import { UserStructure } from "../model/user.model";

export type status = "loading" | "idle" | "error";

export type state = {
 userLoggingStatus: status;
 userLogged: {
  token: string;
  data: UserStructure;
 } | null;
 LoadingUserStatus: status;
 users: UserStructure[];
};

export const initialState: state = {
 userLoggingStatus: "idle",
 userLogged: null,
 LoadingUserStatus: "idle",
 users: [],
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
   state.LoadingUserStatus = "idle";
   console.log(action.payload.results);
   state.users = action.payload.results;
  });
  builder.addCase(asyncLoadUsers.rejected, (state, _action) => {
   state.LoadingUserStatus = "error";
  });

  //login cases
  builder.addCase(asyncLogin.fulfilled, (state, action) => {
   state.LoadingUserStatus = "idle";
   state.userLogged = {
    token: action.payload.results.token,
    data: action.payload.results.data,
   };
   console.log(state.userLogged);
  });
  builder.addCase(asyncLogin.pending, (state, _action) => {
   state.LoadingUserStatus = "loading";
  });
  builder.addCase(asyncLogin.rejected, (state, _action) => {
   state.LoadingUserStatus = "error";
  });

  //register cases

  builder.addCase(asyncRegister.fulfilled, (state, action) => {});
  builder.addCase(asyncRegister.rejected, (state, _action) => {});
 },
});

// export const { logout, updateRelation } = slice.caseReducers;
export const { reducer } = slice;
