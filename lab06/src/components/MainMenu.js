import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";
import { useState } from "react"
import CompGameForm from "./CompGameForm";
import CompGamesList from "./CompGamesList";

const MainMenu = () => {
    const [games, setGames] = useState([]);

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
                        <CompGameForm handleSetGames={setGames}/>
                    }/>
                    <Route path="/list/*" element={
                        <CompGamesList games={games} handleSetGames={setGames}/>
                    }/>
                </Routes>
            </div>
        </Router>
    );
}

export default MainMenu;