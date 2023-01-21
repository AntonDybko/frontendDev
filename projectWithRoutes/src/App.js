import React from 'react';
import './components/App.css'
import {
  Routes,
  Route,
  Link,
} from "react-router-dom";
import CompGameForm from '../src/components/CompGameForm';
import CompGamesList from '../src/components/CompGamesList';
import CompGameUpdate from './components/CompGameDetails';
import NoteList from './components/notatki/NoteList';
import NoteDetails from './components/notatki/NoteDetails';


function App() {

  return (
    
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
                <Route path="/form/*" element={
                    <CompGameForm />
                }/>
                <Route path="/list/*" element={
                    <CompGamesList />
                }/>
                <Route path={`/list/:userId/*`} element={
                    <CompGameUpdate />
                }/>
                <Route path={`/list/:userId/notes/*`} element={
                    <div>
                        <NoteList />
                    </div>
                }/>
                <Route path={`/list/:userId/notes/:noteId`} element={
                    <div>
                        <NoteDetails />
                    </div>
                }/>
            </Routes>
        </div>
    
  );
}

export default App;
