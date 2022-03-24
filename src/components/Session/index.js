import { Link } from "react-router-dom";

import "./style.css";

function Session(props) {
    const {id, date, showtimes} = props;

    return (
        <li className="Session">
            <h3>{date}</h3>
            <div className="session-times">
                {showtimes.map(({id, name}) => <Link to={`/sessao/${id}`}><button key={id}>{name}</button></Link>)}
            </div>
        </li>
    );
} 

export default Session;