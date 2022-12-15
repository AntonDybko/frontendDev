import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getGames,
  addToState,
  incrementByAmount,
  incrementAsync,
  incrementIfOdd,
  selectCount,
} from './counterSlice';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import CompGameForm from '../../components/CompGameForm';

export function Counter() {
  const games = useSelector(getGames);
  const dispatch = useDispatch();
  //const [incrementAmount, setIncrementAmount] = useState('2');
  //const [games, setGames] = useState([]);

  //const incrementValue = Number(incrementAmount) || 0;

  return (
    <div>
      <CompGameForm></CompGameForm>
      <ul>
        {games.map(game => (
            <li key={game.id}>
                <div>Name: {game.name}</div>
                <div>Price: {game.price}</div>
            </li>
        ))}
      </ul>
    </div>
  );
}
