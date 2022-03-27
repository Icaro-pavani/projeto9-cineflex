import SeatElement from "../SeatElement";

import "./style.css";

function SeatsRow(props) {
    const {seatsRow, setSeatsSelected, names, cpfs} = props;

    return (
        <ul className="SeatsRow">
            {seatsRow.map((seat, index) => (
                <SeatElement 
                    key={index} 
                    id={seat[2]} 
                    isAvailable={seat[1]} 
                    seat={seat[0]} 
                    names={names}
                    cpfs={cpfs}
                    setSeatsSelected={setSeatsSelected}
                />
            ))}
        </ul>
    );
}

export default SeatsRow;