import f2067 from "./assets/2067.svg";
import enola from "./assets/enola.svg";

import "./style.css";


function InitialScreen() {
    const films = [1,2,3,4,5,6,7,8];
    return (
        <main className="InitialScreen">
            <h2>Selecione o filme</h2>
            <div className="films">
                {films.map(film => film % 2 !== 0 ? 
                    <div key={film} className="film"><img src={f2067} alt="2067"/></div>
                    : <div key={film} className="film"><img src={enola} alt="enola"/></div>)}
            </div>
        </main>
    )
}

export default InitialScreen;