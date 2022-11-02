import noteContext from "../context/notes/noteContext";

import { useContext } from "react";

export default function NoteItem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;

  const { note, updatenote } = props;
  return (
    <>
      <div className="flex flex-col p-2 my-3 md:p-3 rounded-lg border  border-stone-200  transition-all duration-300 bg-stone-100 hover:bg-white hover:shadow-md shadow">
        <div className="flex justify-between items-center">
          <div>
            <h5 className="text-base font-semibold text-gray-800 ">
              {note.title}
            </h5>
          </div>
          <div className="flex space-x-2 ">
            <div
              className="cursor-pointer"
              onClick={() => {
                deleteNote(note._id);
                props.showAlert(" Note Deleted successfully", "success");
              }}
            >
              <ion-icon name="trash-outline"></ion-icon>
            </div>
            <div className="cursor-pointer" onClick={()=>{updatenote(note)} }>
              {" "}
              <ion-icon name="create-outline"></ion-icon>
            </div>
          </div>
        </div>
        <hr className="my-1" />
        <p className="my-3 font-normal text-xs text-gray-600">
          {note.description}
        </p>
      </div>
    </>
  );
}
