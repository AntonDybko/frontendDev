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
import CompGamesList from '../../components/CompGamesList';

export function Counter() {
  const games = useSelector(getGames);
  const dispatch = useDispatch();

  return (
    <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/form">Form</Link>
                    </li>
                    <li>
                        <Link to="/list">List</Link>
                    </li>
                </ul>

                <hr/>

                <Routes>
                    <Route path="/form" element={
                        <CompGameForm />
                    }/>
                    <Route path="/list/*" element={
                        <CompGamesList />
                    }/>
                </Routes>
            </div>
        </Router>
  );
}
