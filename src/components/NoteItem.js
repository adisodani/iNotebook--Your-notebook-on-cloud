import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';

const NoteItem = (props) => {   
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
        
            <div className="col-md-3">
                <div className="card my-3">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <h5 className="card-title">{note.title}</h5>
                            <i className="fa-solid fa-file-pen mx-2" onClick={()=>{updateNote(note)}}></i>
                            <i className="fa-solid fa-trash fa-lg" onClick= {()=> {deleteNote(note._id);  props.showAlert("Deleted successfully", "success")}}></i>
                        </div>
                        <p className="card-text">{note.description}</p>
                    </div>
                </div>
            </div>
        )
}

export default NoteItem
