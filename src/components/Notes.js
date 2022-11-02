import React, { useContext, useEffect, useRef, useState } from "react";
import {useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes, eidtNote } = context;
  const navigate = useNavigate()
  // For Model
  const [showModal, setShowModal] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();
    }
    else{
      navigate("/Login");
    }
    // eslint-disble-next-line
  }, []);


  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const updatenote = (currentNote) => {
    ref.current.click();
    setNote({
      _id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  
    
  };

  const handleclick = (e) => {
    console.log("updating the note", note);
    eidtNote(note._id, note.etitle, note.edescription, note.etag);
    setShowModal(false);
    props.showAlert(" Note Updated successfully.", "success");

  };
  //On change
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div>
        <AddNote  showAlert={props.showAlert}/>
        <button
          ref={ref}
          className=" hidden text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          type="button"
          onClick={() => setShowModal(true)}
        >
          Open regular modal
        </button>

        {showModal ? (
          <>
            <div className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed left-0 right-0 -top-1  z-50 outline-none focus:outline-none">
              <div className="relative  my-6 mx-auto max-w-3xl w-full">
                {/*content*/}
                <div className="border-0 w-full rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-xl font-semibold text-gray-800">
                      Edit Note
                    </h3>
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span className=" text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                        X
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto w-full">
                    <form action="">
                      <div>
                        <label
                          htmlFor="large-input"
                          className="block mb-2 text-sm font-medium text-gray-900"
                        >
                          Title
                        </label>
                        <input
                          
                          name="etitle"
                          value={note.etitle}
                          onChange={onchange}
                          type="text"
                          className="block p-2 w-full  bg-gray-50 rounded-lg border border-gray-300  dark:border-none outline-none shadow-sm focus:shadow-lg focus:bg-white text-sm text-gray-700"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="large-input"
                          className="block mt-4 mb-1 text-sm font-medium text-gray-900"
                        >
                          Description
                        </label>
                        <textarea
                        
                          rows={8}
                          name="edescription"
                          value={note.edescription}
                          onChange={onchange}
                          type="text"
                          className="block px-2 py-4  w-full  bg-gray-50 rounded-lg border border-gray-300  dark:border-none outline-none shadow-sm focus:shadow-lg focus:bg-white text-sm text-gray-700"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="large-input"
                          className="block mt-4 mb-1 text-sm font-medium text-gray-900"
                        >
                          Tag
                        </label>
                        <input
                          
                          name="etag"
                          onChange={onchange}
                          value={note.etag}
                          type="text"
                          className="block p-2 w-40  bg-gray-50 rounded-lg border border-gray-300  dark:border-none outline-none shadow-sm focus:shadow-lg focus:bg-white text-sm text-gray-700"
                        />
                      </div>
                    </form>
                  </div>

                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="background-transparent text-rose-600 font-medium uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                    disabled={note.etitle.length<5 || note.edescription.length<5 || note.etag.length<3}
                      className="bg-emerald-500 text-sm font-medium  text-white active:bg-emerald-600  uppercase  px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleclick}
                    >
                      Update Note
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : (
          ""
        )}

        <h1 className="text-xl font-medium ">Your notes:</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {notes.length === 0 && "No notes to display"}
          {notes.map((note) => {
            return (
              <NoteItem key={note._id} note={note} updatenote={updatenote} showAlert={props.showAlert}/>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Notes;
