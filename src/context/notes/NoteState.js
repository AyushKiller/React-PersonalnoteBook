//import react from "react";
import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  
   const host = "http://localhost:3005";
  const noteInitial = [ ]
  const [note, setNote] = useState(noteInitial);
   //Get all note
  const getAllNote = async () => {
    const response = await fetch(`${host}/api/notes/getuser`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      
    });
    const json =await response.json();
    console.log(json)
    setNote(json)

  };
  //Add a note
  const addNote = async (title, description, tag) => {
    
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body:JSON.stringify({title, description, tag})
    });
    const note1 = await response.json();
   
     setNote(note.concat(note1))
  };
  //Delete a note
  const deleteNote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token':localStorage.getItem('token')
      },
      
    });
    const json = await response.json();
    console.log(json)
    console.log("Deleting the message with note" + id);
    const newNode = note.filter((note) => { return note._id !== id })
    setNote(newNode);


  };
  //update a note
  
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    getAllNote(response.json)
    const serverResponse = await response.json(); 
    if(serverResponse.success){
      let newLocal_1 = props.showAlert;
      newLocal_1(`${serverResponse.message}`,'success');
    }else {
      if(serverResponse.message===undefined){
      let newLocal = props.showAlert;
      newLocal("Unable to update notes",'danger');
      }else{
        let newLocal = props.showAlert;
        newLocal(`${serverResponse.message}`,'danger');
        
      }

    
  }
     let newNotes = JSON.parse(JSON.stringify(note))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNote(newNotes);
  }
  return (
    <NoteContext.Provider value={{ note, addNote, deleteNote, editNote,getAllNote }}>
      {props.children}
    </NoteContext.Provider>

  )

  }




export default NoteState;