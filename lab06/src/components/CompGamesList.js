//import { useState } from "react"
//import CompGameForm from "./CompGameForm";
import CompGameUpdate from "./CompGameUpdate";
import {
    Routes,
    Route,
    Link
} from "react-router-dom";

const CompGamesList = (props) => {
    //const [games, setGames] = useState([]);

    const handleDeleteGame = (event) =>{
        const name = event.target.getAttribute("name")
        props.handleSetGames(props.games.filter(item => item.name !== name));
    }
    //let { url } = useLocation ();
    //const { id } = useParams();
    return (
        <ul>
            {props.games.map(game => (
                <li key={game.id}>
                    <div>Name: {game.name}</div>
                    <div>Price: {game.price}</div>
                    <Link to={`:${game.id}`}>More...</Link>
                    <div>
                        <button type="button" name={game.name} onClick={handleDeleteGame}>Delete</button>
                    </div>
                    <hr/>
                    <Routes>
                        <Route path={`:${game.id}/*`} element={
                            <CompGameUpdate game={game} handleChangeGame={props.handleSetGames}/>
                        }/>
                    </Routes>
                </li>
            ))}
        </ul>
    )

}

export default CompGamesList