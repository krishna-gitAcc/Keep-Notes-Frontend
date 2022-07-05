import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext';


const NoteItem = (props) => {
    const { note } = props;
    const context = useContext(noteContext);
    const {deleteNote} = context;
    // const onClick = () =>{
    //     console.log("delete button is clicked")
    // }
    return (
        <>
            <div className="col-md-3">
                <div className="card my-3">
                    <div className="card-body">
                        <div className="d-flex">
                            <h5 className="card-title mr-auto p-2">{note.title}</h5>
                            <i className="fa-solid fa-trash-can mx-2 p-2" onClick={()=>{deleteNote(note._id)}}></i>
                            <i className="fa-solid fa-pen-to-square mx-2 p-2"></i>
                        </div>
                        {/* <h5 className="card-title">{note.title}</h5> */}
                        <p className="card-text">{note.description} </p>

                    </div>
                </div>
            </div>

        </>
    )
}

export default NoteItem
