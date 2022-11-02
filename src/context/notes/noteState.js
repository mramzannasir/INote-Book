import NoteContext from "./noteContext";
import React, { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const intialnotes = [];
  const [notes, setNotes] = useState(intialnotes);

  // Get all notes
  const getNotes = async () => {
    // TODO api cal
    const response = await fetch(`${host}/api/notes/fetchnote`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  };

  // Add a noteeeeeeeeeeeeeeeeeeeee
  const addNote = async (title, description, tag) => {
    // TODO api cal
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await  response.json();
    setNotes(notes.concat(note));
 
    
    
  };

  // Edit a noteeeeeeeeeeeeeeeeeeeeeee
  const eidtNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    console.log(response);

// Make  note for making a update copy
let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic for Edit in client side
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      // Logic eidt into client
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  };
  // Delete a noteeeeeeeeeeeeeeeeeeeee
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token'),
      },
    });
    console.log(response);
    console.log("Delting Note with this Id" + id);
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, eidtNote, deleteNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
