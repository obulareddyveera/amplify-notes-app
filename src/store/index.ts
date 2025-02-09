import { configureStore } from "@reduxjs/toolkit";
import notesAppReducer from './slice/notes-app-slice'

export const store = configureStore({
  reducer: {
    notesAppState: notesAppReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
