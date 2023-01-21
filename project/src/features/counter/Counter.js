import { useDispatch, useSelector } from 'react-redux';
import {
  addToState,
  fetchGames
} from './counterSlice';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import {useEffect} from 'react';
import CompGameForm from '../../components/CompGameForm';
import CompGamesList from '../../components/CompGamesList';
import CompGameUpdate from '../../components/CompGameUpdate';
import axios from 'axios'

export function Counter() {
  const dispatch = useDispatch();


  return (
    <Router>
        <div className='mainrout'>
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
