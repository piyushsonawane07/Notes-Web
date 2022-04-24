import React, { useContext, useState } from 'react'
import noteContext from "../context/notes/NoteContext"

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "default" })

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="container col-md-4 my-3 addnote">
            <div className="text-center">
                <h3 className="fw-bold">Add a Note</h3>
            </div>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label fw-bold">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label fw-bold">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag}  onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label fw-bold">Description</label>
                    <textarea rows="3" type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} />
                </div>     
                <div className="text-center">
                    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-warning fw-bold" onClick={handleClick}>Add Note</button>
                </div>
            </form>
        </div>
    )
}

export default AddNote;