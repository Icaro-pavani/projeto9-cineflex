import { useState } from "react";

function SeatElement(props) {
    const {seat, isAvailable, seatsSelected, id} = props;
    const [select, setSelect] = useState(false);

    if (!isAvailable) {
        return <li className="unavailable" onClick={() => alert("Esse assento não está disponível")}>{seat}</li>;
    }

    return (
        <li className={select ? "selected" : "available"} onClick={() => {
            seatsSelected[id] = !select;
            setSelect(!select);
        }}>{seat}</li>
    );
}

export default SeatElement;