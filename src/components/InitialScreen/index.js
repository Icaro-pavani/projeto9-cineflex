import f2067 from "./assets/2067.svg";
import enola from "./assets/enola.svg";

import "./style.css";


function InitialScreen() {
    const films = [1,2,3,4,5,6,7,8];
    return (
        <main className="InitialScreen">
            <h2>Selecione o filme</h2>
            <ul className="films">
                {films.map(film => film % 2 !== 0 ? 
                    <li key={film} className="film"><img src={f2067} alt="2067"/></li>
                    : <li key={film} className="film"><img src={enola} alt="enola"/></li>)}
            </ul>
        </main>
    )
}

export default InitialScreen;