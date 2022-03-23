import f2067 from "./../assets/2067.svg";
import enola from "./../assets/enola.svg";


function InitialScreen() {
    const films = [1,2,3,4,5,6,7,8];
    return (
        <main>
            <h2>Selecione o filme</h2>
            <div className="films">
                {films.map(film => film % 2 !== 0 ? <img key={film} src={f2067} alt="2067"/> : <img key={film} src={enola} alt="enola"/>)}
            </div>
        </main>
    )
}

export default InitialScreen;