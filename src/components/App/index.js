import { useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Header from "./../Header";
import InitialScreen from "./../InitialScreen";
import FilmSessions from "../FilmSessions";
import Seats from "../Seats";
import Success from "../Success";

function App() {
    const [confirmBackButton, setConfirmBackButton] = useState(false);

    return (
        <BrowserRouter>
            <Header title="CINEFLEX" confirmBackButton={confirmBackButton}/>
            <Routes>
                <Route path="/" element={<InitialScreen setConfirmBackButton={setConfirmBackButton} />} />
                <Route path="/filme/:idFilm" element={<FilmSessions setConfirmBackButton={setConfirmBackButton} />} />
                <Route path="/sessao/:idSession" element={<Seats setConfirmBackButton={setConfirmBackButton} />} />
                <Route path="/sucesso" element={<Success setConfirmBackButton={setConfirmBackButton} />} />
            </Routes> 
        </BrowserRouter>
    );
}

export default App;