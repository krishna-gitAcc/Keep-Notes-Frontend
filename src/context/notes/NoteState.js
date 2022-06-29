import React from "react";
import { useState } from "react";

import NoteContext from "./noteContext";

const NoteState = (props) => {

    const notesInitial = [
        {
            "_id": "62ba93ccc89804711d891d9b",
            "user": "62ba92efc89804711d891d94",
            "title": "My Title",
            "description": "Please uake up early",
            "tag": "personal",
            "date": "2022-06-28T05:38:20.936Z",
            "__v": 0
        },
        {
            "_id": "62ba93ccc89804711d891d9b",
            "user": "62ba92efc89804711d891d94",
            "title": "My Title",
            "description": "Please uake up early",
            "tag": "personal",
            "date": "2022-06-28T05:38:20.936Z",
            "__v": 0
        }, {
            "_id": "62ba93ccc89804711d891d9b",
            "user": "62ba92efc89804711d891d94",
            "title": "My Title",
            "description": "Please uake up early",
            "tag": "personal",
            "date": "2022-06-28T05:38:20.936Z",
            "__v": 0
        }, {
            "_id": "62ba93ccc89804711d891d9b",
            "user": "62ba92efc89804711d891d94",
            "title": "My Title",
            "description": "Please uake up early",
            "tag": "personal",
            "date": "2022-06-28T05:38:20.936Z",
            "__v": 0
        }, {
            "_id": "62ba93ccc89804711d891d9b",
            "user": "62ba92efc89804711d891d94",
            "title": "My Title",
            "description": "Please uake up early",
            "tag": "personal",
            "date": "2022-06-28T05:38:20.936Z",
            "__v": 0
        },
        {
            "_id": "62ba93ccc89804711d891d9b",
            "user": "62ba92efc89804711d891d94",
            "title": "My Title",
            "description": "Please uake up early",
            "tag": "personal",
            "date": "2022-06-28T05:38:20.936Z",
            "__v": 0
        },
        {
            "_id": "62ba96a1c89804711d891da0",
            "user": "62ba92efc89804711d891d94",
            "title": "My Title",
            "description": "Please uake up early",
            "tag": "personal",
            "date": "2022-06-28T05:50:25.077Z",
            "__v": 0
        },
        {
            "_id": "62ba9d16542c6ad0dd0855b8",
            "user": "62ba92efc89804711d891d94",
            "title": "My Title",
            "description": "Please uake up early",
            "tag": "personal",
            "date": "2022-06-28T06:17:58.257Z",
            "__v": 0
        },
        {
            "_id": "62ba9d16542c6ad0dd0855ba",
            "user": "62ba92efc89804711d891d94",
            "title": "My Title",
            "description": "Please uake up early",
            "tag": "personal",
            "date": "2022-06-28T06:17:58.971Z",
            "__v": 0
        },
        {
            "_id": "62ba9d17542c6ad0dd0855bc",
            "user": "62ba92efc89804711d891d94",
            "title": "My Title",
            "description": "Please uake up early",
            "tag": "personal",
            "date": "2022-06-28T06:17:59.522Z",
            "__v": 0
        }
    ];

    const [notes, setnotes] = useState(notesInitial)

    return (
        <NoteContext.Provider value={{ notes, setnotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;