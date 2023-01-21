import axios from 'axios'
import {
    Link
} from "react-router-dom";
import {
    getGames,
    sortByDate,
    sortByTitle,
    addToState,
    asyncDeleteGame,
  } from '../features/counter/gamesSlice';
import {  useDispatch, useSelector } from 'react-redux';



 const CompGamesList = () => {
    const dispatch = useDispatch();
    const games = [...useSelector(getGames)]

    const handleDeleteGame = (event) =>{
        const id = event.target.getAttribute("id")
        dispatch(asyncDeleteGame(id))
    }
    const handleSortByTitle = (e) =>{
        dispatch(sortByTitle())
    }
    const handleSortByDate = (e) =>{
        dispatch(sortByDate())
    }

    if(games.length ===0 ){
        axios.get("http://localhost:8080/").then(function (response) {
            response.data.forEach(game => {
                let currgame = games.filter(x => x.id === game.id) 
                if(currgame.length === 0){
                  dispatch(addToState(game));
                }
            })
        })
    }
    function fetchData() {
        axios.get("http://localhost:8080/").then(function (response) {
            response.data.forEach(game => {
                let currgame = games.filter(x => x.id === game.id) 
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
                        <img src={game.thumbnail} alt="list"></img>
                        <div>Genre: {game.genre}</div>
                        <div>Publisher: {game.publisher}</div>
                        <Link to={`/list/${game.id}`} state={{ currgame: game }}>More...</Link>
                        <div>
                            <button type="button" id={game.id} onClick={handleDeleteGame}>Delete</button>
                        </div>
                        <hr/>
                    </li>
                ))}
            </ul>
        </div>
    )

}

export default CompGamesList