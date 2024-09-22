import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { reducer } from "../../users/reducer/slice";

export const store = configureStore({
 reducer: {
  users: reducer,
 },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
 ReturnType,
 RootState,
 unknown,
 Action<string>
>;
