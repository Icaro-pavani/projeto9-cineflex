import {BrowserRouter, Routes, Route} from "react-router-dom";

import Header from "./../Header";
import InitialScreen from "./../InitialScreen";

function App() {
    return (
        <BrowserRouter>
            <Header title="CINEFLEX" />
            <Routes>
                <Route path="/" element={<InitialScreen />} />
            </Routes> 
        </BrowserRouter>
    );
}

export default App;