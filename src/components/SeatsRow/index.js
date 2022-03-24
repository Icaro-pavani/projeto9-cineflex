import SeatElement from "../SeatElement";

import "./style.css";

function SeatsRow(props) {
    const {seatsRow} = props;

    return (
        <ul className="SeatsRow">
            {seatsRow.map((seat, index) => <SeatElement key={index} isAvailable={seat[1]} seat={seat[0]}/>)}
        </ul>
    );
}

export default SeatsRow;