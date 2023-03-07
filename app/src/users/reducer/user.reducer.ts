import { produce } from "immer";
import { UserStructure } from "../model/user.model";
import { usersActions } from "./user.actions.type";

export interface UserState {
  users: UserStructure[];
  token: any;
}

const initialState: UserState = {
  users: [],
  token: null,
};

export const userReducer = produce((draftState: UserState, action) => {
  switch (action.type) {
    case usersActions.load:
      draftState.users = action.payload;
      break;
    case usersActions.add_relation:
    case usersActions.remove_relation:
    case usersActions.update:
      const userIndex = draftState.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (userIndex !== -1) {
        draftState.users[userIndex] = action.payload;
      }
      break;
    case usersActions.register:
      draftState.users = [...draftState.users, action.payload];
      break;
    case usersActions.login:
      draftState.token = action.payload.token;
      break;
    default:
      break;
  }
}, initialState);
