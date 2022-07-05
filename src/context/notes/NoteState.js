import React from "react";
import { useState } from "react";

import NoteContext from "./noteContext";

const NoteState = (props) => {

    const host = "http://localhost:5000";
    const auth_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzJlZTc2MjlhYjdlNDM0NTYyZWQ2ZCIsImlhdCI6MTY1Njk0NDEwNX0.fxMamPcy0VPj-alve9ohQ_CG8VVdSyImPVOYkot1P-0'


    const notesInitial = [];
    const [notes, setnotes] = useState(notesInitial)



    // Get all notes API CALL
    const getNotes = async () => {
        //API CALL
        // console.log("api call for get Notes");
        const response = await fetch('http://localhost:5000/api/notes/fetchallnotes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": auth_token
            },
        });

        const json = await response.json();
        // console.log(json);
        setnotes(json);

    }
    //CRUD of note.


    //Add a Note
    const addNote = async (title, description, tag) => {
        //TODO: API Call
        const response = await fetch(`${host}/api/notes/addnotes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": auth_token,
            },
            body: JSON.stringify({ title, description, tag })
        });

        const json = response.json();

        let note = {
            "_id": "62ba93ccc8asdf9dsdf804711d891d9b",
            "user": "62ba92efc89804711d891d94",
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

        //TODO: API CAll for delete a note from data-base
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
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

        //TODO: API Call
        const response = await fetch(`${host}/api/notes/updatenotes/62ba93abc89804711d891d99`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
                "auth-token": auth_token,
            },
            body: JSON.stringify({ title, description, tag })
        });

        const json = response.json();

        //logic to edit at client side.
        for (let i = 0; i < notes.length; i++) {
            const element = notes[i];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }

        }

    }



    return (
        <NoteContext.Provider value={{ notes, setnotes, addNote, editNote, deleteNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;