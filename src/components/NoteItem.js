import React,{useContext} from 'react'
import noteContext from '../context/notes/NoteContext';

export default function NoteItem(props) {

    const context = useContext(noteContext);
    const {deleteNote} = context;
    const {note,updateNote} = props;

    return (

            <div className="col-md-3">
                <div className="card m-4">
                    <div className="card-body">
                        <h5 className="card-title fw-bold">{props.title}</h5>
                        <h6 className="card-title fw-bold">{props.tag}</h6>
                        <p className="card-text">{props.description}</p>
                        <i className="fas fa-pen mt-2" onClick={() => {updateNote(note)}}></i>
                        <i className="fas fa-trash mt-2 ms-3" onClick={()=>{deleteNote(note._id)}}></i>
                    </div>
                </div>
            </div>

    )
}
