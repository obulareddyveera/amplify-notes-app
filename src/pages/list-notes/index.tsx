import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteNotesSliceAction, listNotesSliceAction } from "../../store/actions/notes-list-action";
import { AppDispatch, RootState } from "../../store";
import { Note } from "../../store/slice/notes-app-slice";

export default function ListNotesPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { notes } = useSelector((state: RootState) => state.notesAppState);

  useEffect(() => {
    listNotesSliceAction()(dispatch);
  }, [dispatch]);

  function formatDateField(input: string) {
    const date = new Date(input);
    const dateString = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const timeString = date.toLocaleTimeString("en-US");
    return `${dateString} ${timeString}`;
  }

  async function deleteNoteEntity(note: Note) {
    await deleteNotesSliceAction(note)(dispatch)
    await listNotesSliceAction()(dispatch);
  }

  return (
    <>
      <div className="flex flex-col py-4 px-4">
        {notes.map((note, index) => {
          return (
            <div
              className="flex flex-col  py-2 px-2 shadow-xs bg-white"
              key={`_notesEntity_${index}`}
            >
              <div className="flex justify-end">
                <span className="inline-flex overflow-hidden rounded-md bg-white">
                  <a
                    className="inline-block p-3 text-gray-700 hover:bg-gray-50 focus:relative cursor-pointer border-b-[0.2px]"
                    title="Edit Product"
                    href={`/form/${note.id}`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </a>
                  <button
                    className="inline-block  p-3 text-green-700 hover:bg-gray-50 focus:relative cursor-pointer border-b-[0.2px]"
                    title="Edit Product"
                    disabled={note.completed}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  </button>
                  <button
                    className="inline-block p-3 text-gray-700 hover:bg-gray-50 focus:relative cursor-pointer border-b-[0.2px]"
                    title="Delete Product"
                    onClick={() => deleteNoteEntity(note)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                </span>
              </div>

              <div className="font-serif text-xl">{note.name}</div>
              <div className="font-light font-sans">{note.description}</div>
              <div className="flex flex-col font-light font-sans">
                <div>Created : {formatDateField(note.createdAt)}</div>
                <div>Updated : {formatDateField(note.updatedAt)}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
