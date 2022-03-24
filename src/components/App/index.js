import {BrowserRouter, Routes, Route} from "react-router-dom";

import Header from "./../Header";
import InitialScreen from "./../InitialScreen";
import FilmSessions from "../FilmSessions";

function App() {
    return (
        <BrowserRouter>
            <Header title="CINEFLEX" />
            <Routes>
                <Route path="/" element={<InitialScreen />} />
                <Route path="/filme/:idFilm" element={<FilmSessions />} />
            </Routes> 
        </BrowserRouter>
    );
}

export default App;