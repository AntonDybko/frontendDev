import NoteDetails from "./NoteDetails";
import {
    Routes,
    Route,
    Link
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import {
    handleNote
} from '../../features/counter/counterSlice';

const NoteList = (props) => {
    const dispatch = useDispatch();
    const handleDeleteNote = (event) =>{
        const data = parseInt(event.target.getAttribute("data"));
        const newNotes = props.game.notes.filter(note => note.data !== data);
        const action = {
            id: props.game.id,
            newNotes: newNotes
        }
        dispatch(handleNote(action))
    }
    return (
        <div>
            <ul>
                {props.game.notes.map(note => (
                    <li key={note.id}>
                        <div>Data: {note.data}</div>
                        <div>Tresc: {note.tresc}</div>
                        <Link to={`:${note.id}`}>Details</Link>
                        <div>
                            <button type="button" data={note.data} onClick={handleDeleteNote}>Delete</button>
                        </div>
                        <hr/>
                        <Routes>
                            <Route path={`:${note.id}/*`} element={
                                <NoteDetails note={note} game={props.game}/>
                            }/>
                        </Routes>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default NoteList