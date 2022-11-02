import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";


const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleclick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });

    props.showAlert(" Note add successfully", "success");

  };

  //On change
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="mb-6">
        <form action="">
          <div>
            <label
              htmlFor="large-input"
              className="block mb-2 mt-4  text-sm lg:text-2xl font-medium text-gray-900"
            >
              Title
            </label>
            <input
              value={note.title}
              name="title"
              onChange={onchange}
              type="text"
              id="large-input"
              className="block p-2 w-full  bg-gray-50 rounded-lg border border-gray-300  dark:border-none outline-none shadow-sm focus:shadow-lg focus:bg-white text-sm text-gray-700"
            />
          </div>
          <div>
            <label
              htmlFor="large-input"
              className="block mt-4 mb-1 text-sm lg:text-2xl  font-medium text-gray-900"
            >
              Description
            </label>
            <textarea
            
              value={note.description}
              rows={12}
              name="description"
              onChange={onchange}
              type="text"
              id="large-input"
              className="block px-2 py-4  w-full  bg-gray-50 rounded-lg border border-gray-300  dark:border-none outline-none shadow-sm focus:shadow-lg focus:bg-white text-sm text-gray-700"
            />
          </div>
          <div>
            <label
              htmlFor="large-input"
              className="block mt-4 mb-1 text-sm lg:text-2xl  font-medium text-gray-900"
            >
              Tag
            </label>
            <input
              value={note.tag}
              name="tag"
              onChange={onchange}
              type="text"
              id="large-input"
              className="block p-2 w-40  bg-gray-50 rounded-lg border border-gray-300  dark:border-none outline-none shadow-sm focus:shadow-lg focus:bg-white text-sm text-gray-700"
            />
          </div>
        </form>
        <button
          disabled={
            note.title.length < 5 ||
            note.description.length < 5 ||
            note.tag.length < 3
          }
          className="bg-gray-600 text-stone-300 p-2 my-2 rounded-lg"
          type="Submit"
          onClick={handleclick}
        >
          Add Note
        </button>
      </div>
    </>
  );
};
export default AddNote;
