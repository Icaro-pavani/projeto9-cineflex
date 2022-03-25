import { useState } from "react";

function SeatElement(props) {
    const {seat, isAvailable, setSeatsSelected, id} = props;
    const [select, setSelect] = useState(false);

    if (!isAvailable) {
        return <li className="unavailable" onClick={() => alert("Esse assento não está disponível")}>{seat}</li>;
    }

    return (
        <li className={select ? "selected" : "available"} onClick={() => {
            setSeatsSelected(prevState => ({
                ...prevState,
                [id]: !select
            }));
            setSelect(!select);
        }}>{seat}</li>
    );
}

export default SeatElement;