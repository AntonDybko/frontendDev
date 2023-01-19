import NoteDetails from "./NoteDetails";
import axios from "axios";
import {
    Routes,
    Route,
    Link
} from "react-router-dom";
import { useDispatch } from 'react-redux';
import {
    handleNote,
    sortNotesByDate,
    sortNotesByMark
} from '../../features/counter/counterSlice';

const NoteList = (props) => {
    const dispatch = useDispatch();
    const handleDeleteNote = (event) =>{
        const id = event.target.getAttribute("id");
        const newNotes = props.game.notes.filter(note => note.id !== id);
        const action = {
            id: props.game.id,
            newNotes: newNotes
        }
        axios.delete(`http://localhost:8080/${props.game.id}/${id}`).then(res => {
            console.log(res.status, res.data)
            if(res.status === 204){
                dispatch(handleNote(action))
            }else{
                //allet?tost?
            } 
        })
        //dispatch(handleNote(action))
    }
    const handleSortByDate = (e) =>{
        console.log(props.game.title)
        dispatch(sortNotesByDate(props.game.title))
    }
    const handleSortByMark = (e) =>{
        console.log(props.game.title)
        dispatch(sortNotesByMark(props.game.title))
    }
    return (
        <div>
            <button onClick={handleSortByDate}>Sort by date</button>
            <button onClick={handleSortByMark}>Sort by mark</button>
            <ul>
                {props.game.notes.map(note => (
                    <li key={note.id}>
                        <div>date: {note.data}</div>
                        <div>mark: {note.mark}</div>
                        <Link to={`:${note.id}`}>Details</Link>
                        <div>
                            <button type="button" id={note.id} onClick={handleDeleteNote}>Delete</button>
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