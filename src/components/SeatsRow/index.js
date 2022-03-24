import "./style.css";

function SeatsRow(props) {
    const {seatsRow} = props;
    return (
        <ul className="SeatsRow">
            {seatsRow.map((seat, index) => <li key={index}>{seat}</li>)}
        </ul>
    );
}

export default SeatsRow;