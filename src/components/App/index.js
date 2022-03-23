import {BrowserRouter, Routes, Route} from "react-router-dom";

import Header from "./../Header";
import InitialScreen from "./../InitialScreen";
import Film from "../Film";

function App() {
    return (
        <BrowserRouter>
            <Header title="CINEFLEX" />
            <Routes>
                <Route path="/" element={<InitialScreen />} />
                <Route path="/filme" element={<Film />} />
            </Routes> 
        </BrowserRouter>
    );
}

export default App;