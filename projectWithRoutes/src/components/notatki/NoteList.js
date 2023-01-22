import {
    Link,
    useLocation
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {
    sortNotesByDate,
    sortNotesByMark,
    asyncDeleteNote,
    getGames,
} from '../../features/counter/gamesSlice';
import NoteForm from "./NoteForm";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NoteList = () => {
    const dispatch = useDispatch();
    const location = useLocation()
    const { currgame_id } = location.state

    const games = [...useSelector(getGames)]
    const currgame= games.filter(x => x.id===currgame_id)[0]
    const currnotes = currgame.notes

    const handleDeleteNote = (e) =>{
        const id = e.target.getAttribute("id");
        toast.error(`Note with id (${id}) deleted!`)
        const newNotes = currnotes.filter(note => note.id !== id);
        dispatch(asyncDeleteNote(currgame.id, id, newNotes))
        console.log(currnotes)
    }
    const handleSortByDate = (e) =>{
        console.log(currgame.id)
        dispatch(sortNotesByDate(currgame.id))
    }
    const handleSortByMark = (e) =>{
        console.log(currgame.id)
        dispatch(sortNotesByMark(currgame.id))
    }
    return (
        <div>
            <button onClick={handleSortByDate}>Sort by date</button>
            <button onClick={handleSortByMark}>Sort by mark</button>
            <ul>
                {currnotes.map(note => (
                    <li key={note.id}>
                        <div>date: {note.data}</div>
                        <div>mark: {note.mark}</div>
                        <Link to={`:${note.id}`} state={{ currgame: currgame, currnote: note}}>Details</Link>
                        <div>
                            <button type="button" id={note.id} onClick={handleDeleteNote}>Delete</button>
                        </div>
                        <hr/>
                    </li>
                ))}
            </ul>
            <NoteForm game={currgame}/>
            <ToastContainer />
        </div>
    )
}
export default NoteList