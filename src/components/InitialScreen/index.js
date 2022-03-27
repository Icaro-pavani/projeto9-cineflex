import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Loading from "../Loading";

import "./style.css";

function InitialScreen() {
    const [films, setFilms] = useState([]);

    useEffect(() => {
        const promise = axios.get("https://mock-api.driven.com.br/api/v5/cineflex/movies");
        promise.then(response => {
            setFilms(response.data);
        });

        promise.catch(error => console.log(error.response));
    }, []);


    return (
        <>
            {films.length === 0 ? (<Loading />) : (
                <main className="InitialScreen">
                    <h2>Selecione o filme</h2>
                    <ul className="films">
                        {films.map(({id, posterURL, title}) => (
                            <li key={id} className="film">
                                <Link to={`/filme/${id}`}><img src={posterURL} alt={title} /></Link>
                            </li>
                        ))}
                    </ul>
                </main>
            )}
        </>
    )
}

export default InitialScreen;