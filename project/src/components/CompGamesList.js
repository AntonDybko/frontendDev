//import { useState } from "react"
//import CompGameForm from "./CompGameForm";
import CompGameUpdate from "./CompGameUpdate";
import axios from 'axios'
import {
    Routes,
    Route,
    Link
} from "react-router-dom";
import {
    deleteGame,
    getGames,
    sortByDate,
    sortByTitle,
    addToState
  } from '../features/counter/counterSlice';
import {  useDispatch, useSelector } from 'react-redux';
//import {useState, useEffect} from 'react'

 const CompGamesList = () => {
    const dispatch = useDispatch();
    //const [games, setGames] = useState([...useSelector(getGames)]);
    const games = [...useSelector(getGames)]
    const handleDeleteGame = (event) =>{
        const id = event.target.getAttribute("id")
        console.log(id)//test
        axios.delete(`http://localhost:8080/${id}`).then(res => {
            console.log(res.status, res.data)
            if(res.status === 204){
                dispatch(deleteGame(id))
            }else{
                //allet?tost?
            }
        })
    }
    const handleSortByTitle = (e) =>{
        dispatch(sortByTitle())
    }
    const handleSortByDate = (e) =>{
        dispatch(sortByDate())
    }
    if(games.length ===0 ){
        axios.get("http://localhost:8080/").then(function (response) {
            console.log(response.data)
            response.data.forEach(game => {
                dispatch(addToState(game));
            })
        })
    }
    
    function fetchData() {
        axios.get("http://localhost:8080/").then(function (response) {
            console.log(response.data)
            response.data.forEach(game => {
                console.log('fetchtest')
                let currgame = games.filter(x => x.id === game.id) //test
                if(currgame.length === 0){
                  dispatch(addToState(game));
                }
            })
        })
    }

    return (
        <div>
            <button onClick={fetchData}>fetch games</button>
            <button onClick={handleSortByTitle}>Sort by alphabet</button>
            <button onClick={handleSortByDate}>Sort by date</button>
            <ul>
                {games.map(game => (
                    
                    <li key={game.id}>
                        <div>Name: {game.title}</div>
                        <img src={game.thumbnail}></img>
                        <div>Genre: {game.genre}</div>
                        <div>Publisher: {game.publisher}</div>
                        <Link to={`:${game.id}`}>More...</Link>
                        <div>
                            <button type="button" id={game.id} onClick={handleDeleteGame}>Delete</button>
                        </div>
                        <hr/>
                        <Routes>
                            <Route path={`:${game.id.toString()}/*`} element={
                                <CompGameUpdate game={game} />
                            }/>
                        </Routes>
                    </li>
                    
                ))}
            </ul>
        </div>
    )

}

export default CompGamesList