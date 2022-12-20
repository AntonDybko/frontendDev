//import { useState } from "react"
//import CompGameForm from "./CompGameForm";
import CompGameUpdate from "./CompGameUpdate";
import {
    Routes,
    Route,
    Link
} from "react-router-dom";
import {
    deleteGame,
    getGames
  } from '../features/counter/counterSlice';
import {  useDispatch, useSelector } from 'react-redux';

const CompGamesList = () => {
    const dispatch = useDispatch();
    const games = useSelector(getGames);
    //const games = useSelector(getGames);
    const handleDeleteGame = (event) =>{
        const name = event.target.getAttribute("name")
        dispatch(deleteGame(name))
    }
    return (
        <ul>
            {games.map(game => (
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
                            <CompGameUpdate game={game} />
                        }/>
                    </Routes>
                </li>
            ))}
        </ul>
    )

}

export default CompGamesList