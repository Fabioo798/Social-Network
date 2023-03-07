import { createAction } from "@reduxjs/toolkit";
import { usersActions } from "./user.actions.type";


export const loadCreator = createAction(usersActions.load);

export const addRelationCreator = createAction(usersActions.add_relation);

export const removeRelationCreator = createAction(usersActions.remove_relation);

export const updateCreator = createAction(usersActions.update);

export const registerCreator = createAction(usersActions.register);

export const loginCreator = createAction(usersActions.login);
