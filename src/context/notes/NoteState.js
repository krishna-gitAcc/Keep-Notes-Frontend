import React from "react";
import { useState } from "react";

import NoteContext from "./noteContext";

const NoteState = (props) => {

    const host = "http://localhost:8000";
    const auth_token = localStorage.getItem('token');
    // console.log(localStorage.getItem('token'));


    const notesInitial = [];
    const [notes, setnotes] = useState(notesInitial)




    // Get all notes API CALL
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": auth_token
            },
        });
        const json = await response.json();
        setnotes(json);
    }




    //**************CRUD of note.************//

    //Add a Note
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": auth_token,
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        let note = {
            "_id": json._id,
            "user": json.user,
            "title": title,
            "description": description,
            "tag": tag,
            "date": "2022-06-28T05:38:20.936Z",
            "__v": 0
        };
        setnotes(notes.concat(note))
    }


    //delete a Note
    const deleteNote = async (id) => {
        await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE', headers: {
                'Content-Type': 'application/json',
                "auth-token": auth_token,
            },
        });

        //logic for client end
        const newNote = notes.filter(note => note._id !== id);
        setnotes(newNote);
    }



    //Edit a Note
    const editNote = async (id, title, description, tag) => {
        await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: 'PUT', headers: {
                'Content-Type': 'application/json',
                "auth-token": auth_token,
            },
            body: JSON.stringify({ title, description, tag })
        });

        //logic to edit at client side.
        const newNotes = JSON.parse(JSON.stringify(notes));
        for (let i = 0; i < newNotes.length; i++) {
            if (newNotes[i]._id === id) {
                newNotes[i].title = title;
                newNotes[i].description = description;
                newNotes[i].tag = tag;
                break;
            }
        }
        setnotes(newNotes);
    }


    //************* return from the function***************/
    return (
        <NoteContext.Provider value={{ notes, setnotes, addNote, editNote, deleteNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;