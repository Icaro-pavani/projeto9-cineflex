import { useState } from "react";

function SeatElement(props) {
    const {seat, isAvailable} = props;
    const [select, setSelect] = useState(false);

    if (!isAvailable) {
        return <li className="unavailable" onClick={() => alert("Esse assento não está disponível")}>{seat}</li>;
    }

    return (
        <>
            {select ? (<li className="selected" onClick={() => setSelect(!select)}>{seat}</li>) : (<li className="available" onClick={() => setSelect(!select)}>{seat}</li>)}
        </>
    );
}

export default SeatElement;