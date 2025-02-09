import { createSlice } from "@reduxjs/toolkit";

export type Note = {
  clientId?: string;
  completed: boolean;
  createdAt: string;
  description: string;
  id: string;
  name: string;
  updatedAt: string;
};

export interface notesAppIState {
  notes: Note[];
  loading: boolean;
  error: boolean;
  form: Note;
  status: number | null;
}

const initialState: notesAppIState = {
  notes: [],
  loading: false,
  error: false,
  form: {
    id: "",
    name: "",
    description: "",
    completed: false,
    updatedAt: new Date().toString(),
    createdAt: new Date().toString(),
  },
  status: null
};

export const notesAppSlice = createSlice({
  name: "notesAppState",
  initialState,
  reducers: {
    notesFormSlice: (state, action) => {
      const { data } = action.payload;
      state.form = data.getNote;
    },
    listNotesSlice: (state, action) => {
      const { data } = action.payload;
      state.notes = data.listNotes.items;
    },
    beginTransaction: (state) => {
      state.loading = true;
    },
    postNotes: (state, action) => {
      state.loading = false;
      const { data } = action.payload;
      state.form = data;
      state.status = 200;
    },
    patchNotes: (state, action) => {
      state.loading = false;
      const { data } = action.payload;
      state.form = data;
      state.status = 200;
    },
    deleteNotes: (state, action) => {
      state.loading = false;
      const { data } = action.payload;
      state.form = data;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  notesFormSlice,
  listNotesSlice,
  beginTransaction,
  postNotes,
  patchNotes,
  deleteNotes,
} = notesAppSlice.actions;

export default notesAppSlice.reducer;
