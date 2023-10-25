import AddNote from './AddNote';
import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from "../context/notes/NoteContext";
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({etitle: "", edescription: "", etag: ""});
    const ref = useRef(null);
    const refClose = useRef(null);
    let navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem("token")){
        getNotes()
    }
    else{
        navigate("/login")
        
        //eslint-disable-next-line
    }}, [])
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
        
    }
    const handleClick = (e) =>{
        editNote(note.id, note.etitle, note.edescription, note.etag);   
        refClose.current.click();
        props.showAlert("Updated successfully", "success")
    }
    const onChange= (e) =>{
        setNote({...note, [e.target.name]: e.target.value});
    }
    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" value= {note.etitle} id="etitle" name="etitle" aria-describedby="emailHelp" onChange={onChange} minLength={3} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" value= {note.edescription} name="edescription" onChange={onChange} minLength={3} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" value= {note.etag} name="etag" onChange={onChange} minLength={3} required />
                                </div>
                            </form>
 
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<3 || note.edescription.length<3} type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container row my-3">
                <h2>You Notes</h2>
                <div className="container">
                    {notes.length===0 && 'No notes to display'}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}   

export default Notes
