import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import Session from "../Session";
import Footer from "../Footer";
import Loading from "../Loading";

import "./style.css";

function FilmSessions(props) {
    const [sessions, setSessions] = useState({});
    const { idFilm } = useParams();


    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilm}/showtimes`);
        promise.then(response => {
            setSessions(response.data);
        });

        promise.catch(error => console.log(error.response));
    }, [idFilm]);

    const { title, posterURL, days } = sessions;

    return (
        <>
            {!sessions.days ? <Loading /> : (
                <div className="FilmSessions">
                    <main>
                        <h2>Selecione o horário</h2>
                        <ul className="sessions">
                            {days.map(({ id, weekday, date, showtimes }) => <Session key={id} date={`${weekday} - ${date}`} showtimes={showtimes} />)}
                        </ul>
                    </main>
                    <Footer image={posterURL} title={title} session="" />
                </div>
            )}
        </>
    );
}

export default FilmSessions;