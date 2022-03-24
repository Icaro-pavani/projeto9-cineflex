import Session from "../Session";
import Footer from "../Footer";

import enola from "./../InitialScreen/assets/enola.svg";

import "./style.css";

function Film() {
    const sessions = [
        {
            date: "Quinta-feira - 24/06/2021",
            time: ["15:00", "19:00"]
        },
        {
            date: "Sexta-feira - 25/06/2021",
            time: ["15:00", "19:00"]
        }
    ]

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