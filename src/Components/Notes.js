import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';


export const Notes = () => {

    const context = useContext(noteContext);
    const { notes, setnotes } = context;

    return (
        <>
            <div className='row my-3'>
                <h2>Your Note</h2>
                {notes.map((note) => {
                    return <NoteItem note={note} />
                })}
            </div>
        </>
    )
}
