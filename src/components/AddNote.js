import React,{useContext} from 'react'
import NoteContext from '../context/notes/NoteContext';
import { useState } from 'react';

const AddNote = (props) => {
    const context=useContext(NoteContext);
    const{addNote}=context
    const[note2,setNote2]=useState({title:"",description:"",tag:""});
    const handleClick=(e)=>{
       e.preventDefault()
        addNote(note2.title,note2.description,note2.tag);
        setNote2({title:"",description:"",tag:""})
        props.showAlert("Note is added","success");
    }
    const onChange=(e)=>{
        setNote2({...note2,[e.target.name]:e.target.value})

    }
  return (
    <div>
      <div className="container my-3">
      <h2> Add notes</h2>
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name='title' value={note2.title} aria-describedby="emailHelp" onChange={onChange}/>
   
  </div>
  <div className="mb-3 ">
    <label htmlFor="description" className="form-label">Description</label>
    <textarea type="text" className="form-control" id="description" name='description'value={note2.description} onChange={onChange} style={{height:90}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name='tag'value={note2.tag} onChange={onChange}/>
  </div>
  
  <button disabled={note2.title.length<5 || note2.description.length<5}  type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
</form>
</div>
    </div>
  )
}

export default AddNote
