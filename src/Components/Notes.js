import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';


export const Notes = () => {

    const context = useContext(noteContext);
    const { notes, getNotes} = context;

    useEffect(()=>{
        getNotes();
    })

    const updateNote = (note) =>{

    }


    return (
        <>
            <AddNote />
            <div className='row my-3'>
                <h2>Your Note</h2>
                {notes.map((note) => {
                    return <NoteItem key={note._id.toString()} updateNote = {updateNote} note={note} />
                })}
            </div>
        </>
    )
}
