import { generateClient } from "aws-amplify/api";
import { getNote, listNotes } from "../../graphql/queries";
import {
  deleteNotes,
  listNotesSlice,
  Note,
  notesFormSlice,
  patchNotes,
  postNotes,
} from "../slice/notes-app-slice";
import { AppDispatch } from "..";
import { createNote, deleteNote, updateNote } from "../../graphql/mutations";

function notesFormSliceAction(id: string) {
  const client = generateClient();
  return async (dispatch: AppDispatch) => {
    try {
      const selectedNotes = await client.graphql({
        query: getNote,
        variables: { id: id },
      });
      console.log("--==> selectedNotes ", selectedNotes);
      dispatch(notesFormSlice(selectedNotes));
    } catch (err) {
      console.log("error: ", err);
    }
  };
}

function listNotesSliceAction() {
  const client = generateClient();
  return async (dispatch: AppDispatch) => {
    try {
      const notesData = await client.graphql({
        query: listNotes,
      });
      console.log("--==> notesData ", notesData);
      dispatch(listNotesSlice(notesData));
    } catch (err) {
      console.log("error: ", err);
    }
  };
}

function postNotesSliceAction(note: Note) {
  const client = generateClient();
  return async (dispatch: AppDispatch) => {
    try {
      await client.graphql({
        query: createNote,
        variables: {
          input: {
            name: note.name,
            description: note.description,
            completed: false,
          },
        },
      });
      dispatch(postNotes(note));
    } catch (err) {
      console.log("error: ", err);
    }
  };
}

function patchNotesSliceAction(note: Note) {
  const client = generateClient();
  return async (dispatch: AppDispatch) => {
    try {
      await client.graphql({
        query: updateNote,
        variables: {
          input: {
            id: note.id,
            name: note.name,
            description: note.description,
            completed: false,
          },
        },
      });
      dispatch(patchNotes(note));
    } catch (err) {
      console.log("error: ", err);
    }
  };
}
function deleteNotesSliceAction(note: Note) {
  const client = generateClient();
  return async (dispatch: AppDispatch) => {
    try {
      await client.graphql({
        query: deleteNote,
        variables: {
          input: {
            id: note.id,
          },
        },
      });
      dispatch(deleteNotes(note));
    } catch (err) {
      console.log("error: ", err);
    }
  };
}

export {
  notesFormSliceAction,
  listNotesSliceAction,
  postNotesSliceAction,
  patchNotesSliceAction,
  deleteNotesSliceAction,
};
