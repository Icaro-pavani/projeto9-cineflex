import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Session from "../Session";
import Footer from "../Footer";

import enola from "./../InitialScreen/assets/enola.svg";

import "./style.css";

function Film() {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        
    },[]);

    return (
        <div className="Film">
            <main>
                <h2>Selecione o horário</h2>
                <ul className="sessions">
                    {sessions.map((session, index) => <Session key={index} session={session} />)}
                </ul>
            </main>
            <Footer image={enola} title="Enola Holmes" session="" />
        </div>
    );
}

export default Film;