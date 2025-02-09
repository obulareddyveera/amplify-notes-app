/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Note } from "../../store/slice/notes-app-slice";
import {
  notesFormSliceAction,
  patchNotesSliceAction,
  postNotesSliceAction,
} from "../../store/actions/notes-list-action";
import { RootState } from "../../store";

export default function NotesFormPage() {
  const [state, setState] = useState<Note>({
    id: "",
    name: "",
    description: "",
    completed: false,
    updatedAt: new Date().toString(),
    createdAt: new Date().toString(),
  });
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { form, status } = useSelector(
    (state: RootState) => state.notesAppState
  );

  async function getNoteById(id: string) {
    console.log("--==getNoteById ", id);
    await notesFormSliceAction(id)(dispatch);
  }
  async function createOrUpdateNotes() {
    if (id && id === "new") {
      await postNotesSliceAction(state)(dispatch);
    } else {
      await patchNotesSliceAction(state)(dispatch);
    }
  }

  function handleChange(
    id: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setState((prevState) => {
      return {
        ...prevState,
        [id]: event.target.value,
      };
    });
  }

  useEffect(() => {
    if (id && id !== "new") {
      getNoteById(id);
    }
  }, [id]);

  useEffect(() => {
    if (form) {
      setState(form);
    }
  }, [form]);

  useEffect(() => {
    if (status === 200) {
      navigate("/");
    }
  }, [navigate, status]);

  return (
    <div className="flex flex-col items-center w-full py-2 px-2">
      <div className="flex flex-col py-2 px-2 shadow-xs bg-white w-full">
        <div className="space-y-4">
          <div>
            <label className="sr-only" htmlFor="name">
              Name
            </label>
            <input
              className="w-full rounded-lg border-2 border-gray-200 p-3 text-sm"
              placeholder="Name"
              type="text"
              autoFocus
              id="name"
              value={state.name}
              onChange={(e) => handleChange("name", e)}
            />
          </div>

          <div>
            <label className="sr-only" htmlFor="message">
              Description
            </label>

            <textarea
              className="w-full rounded-lg border-2 border-gray-200 p-3 text-sm"
              placeholder="Description"
              id="description"
              value={state.description}
              onChange={(e) => handleChange("description", e)}
            ></textarea>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="button"
              className="inline-block w-full rounded-lg bg-blue-400 hover:bg-blue-600 px-2 py-2 font-medium text-white sm:w-auto m-2"
              onClick={createOrUpdateNotes}
            >
              Submit
            </button>
            <a
              href="/"
              className="inline-block w-full rounded-lg bg-slate-400 hover:bg-slate-600 px-2 py-2 font-medium text-white sm:w-auto m-2"
            >
              Cancel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
