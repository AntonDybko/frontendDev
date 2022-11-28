import NoteDetails from "./NoteDetails";
import {
    Routes,
    Route,
    Link
} from "react-router-dom";

const NoteList = (props) => {

    const handleDeleteNote = (event) =>{
        const data = parseInt(event.target.getAttribute("data"));
        const id = props.game.id;
        const newNotes = props.game.notes.filter(note => note.data !== data);

        props.handleGameNotes(games => games.map(game =>{
            if(game.id !== id){
                return game;
            }else{
                return {
                    id: game.id,
                    author: game.author,
                    name: game.name,
                    price: game.price,
                    description: game.description,
                    system_requirements: game.system_requirements,
                    notes: newNotes
                }
            }
        }))
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
                                <NoteDetails note={note} handleGameNotes={props.handleGameNotes} game={props.game}/>
                            }/>
                        </Routes>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default NoteList