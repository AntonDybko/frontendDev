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
        const title = event.target.getAttribute("title")
        dispatch(deleteGame(title))
    }
    const handleSortByTitle = (e) =>{
        dispatch(sortByTitle())
    }
    const handleSortByDate = (e) =>{
        dispatch(sortByDate())
    }
    const options = {
        method: 'GET',
        url: 'https://free-to-play-games-database.p.rapidapi.com/api/filter',
        params: {tag: '3d.mmorpg.fantasy.pvp', platform: 'pc'},
        headers: {
            'X-RapidAPI-Key': '10f7ad6edamshb85b099a1a349d7p113413jsna8336fc9b1bd',
            'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    axios.request(options).then(function (response) {
        response.data.forEach(game => {
            game.notes = [];
            let currgame = games.filter(x => x.id === game.id) //test
            if(currgame.length === 0){
                dispatch(addToState(game));
            }
        })
    });
    function fetchData() {
        axios.request(options).then(function (response) {
            response.data.forEach(game => {
                game.notes = [];
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
                    
                    <li key={game.title}>
                        <div>Name: {game.title}</div>
                        <img src={game.thumbnail}></img>
                        <div>Genre: {game.genre}</div>
                        <div>Publisher: {game.publisher}</div>
                        <Link to={`:${game.title}`}>More...</Link>
                        <div>
                            <button type="button" title={game.title} onClick={handleDeleteGame}>Delete</button>
                        </div>
                        <hr/>
                        <Routes>
                            <Route path={`:${game.title}/*`} element={
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