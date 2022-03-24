import "./style.css";

function Session(props) {
    const {date, showtimes} = props;

    return (
        <li className="Session">
            <h3>{date}</h3>
            <div className="session-times">
                {showtimes.map(({id, name}) => <button key={id}>{name}</button>)}
            </div>
        </li>
    );
} 

export default Session;