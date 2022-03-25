import {BrowserRouter, Routes, Route} from "react-router-dom";

import Header from "./../Header";
import InitialScreen from "./../InitialScreen";
import FilmSessions from "../FilmSessions";
import Seats from "../Seats";
import Sucess from "../Sucess/Sucess";

function App() {
    return (
        <BrowserRouter>
            <Header title="CINEFLEX" />
            <Routes>
                <Route path="/" element={<InitialScreen />} />
                <Route path="/filme/:idFilm" element={<FilmSessions />} />
                <Route path="/sessao/:idSession" element={<Seats />} />
                <Route path="/sucesso" element={<Sucess />} />
            </Routes> 
        </BrowserRouter>
    );
}

export default App;