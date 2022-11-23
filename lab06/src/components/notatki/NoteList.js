import NoteDetails from "./NoteDetails";
import {
    Routes,
    Route,
    Link
} from "react-router-dom";

const NoteList = (props) => {

    const handleDeleteNote = (event) =>{
        const data = event.target.getAttribute("data")
        //props.handleGameNotes(props.notes.filter(note => note.data !== data));
        //tutaj trzeba popracować
    }
    return (
        <div>
            <ul>
                {props.notes.map(note => (
                    <li key={note.id}>
                        <div>Data: {note.data}</div>
                        <div>Tresc: {note.tresc}</div>
                        <Link to={`:${note.id}`}>Details</Link>
                        <div>
                            <button type="button" data={note.data} onClick={handleDeleteNote}>Delete</button>
                        </div>
                        <hr/>
                        <Routes>
                            <Route path={`/notes`} element={
                                <NoteDetails note={note} handleGameNotes={props.handleGameNotes}/>
                            }/>
                        </Routes>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default NoteList