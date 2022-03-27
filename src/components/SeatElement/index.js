import { useState } from "react";

function SeatElement(props) {
    const {seat, isAvailable, setSeatsSelected, id, names, cpfs} = props;
    const [select, setSelect] = useState(false);

    if (!isAvailable) {
        return <li className="unavailable" onClick={() => alert("Esse assento não está disponível")}>{seat}</li>;
    }

    return (
        <li className={select ? "selected" : "available"} onClick={() => {
            if (select && (names[id] || cpfs[id])) {
                if (window.confirm("Você deseja mesmo remover este assento?")){
                    setSeatsSelected(prevState => ({
                        ...prevState,
                        [id]: !select
                    }));
                    setSelect(!select);
                }                
            } else {
                setSeatsSelected(prevState => ({
                    ...prevState,
                    [id]: !select
                }));
                setSelect(!select);
            }
        }}>{seat}</li>
    );
}

export default SeatElement;