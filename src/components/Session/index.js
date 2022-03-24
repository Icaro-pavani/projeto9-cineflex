import { Link } from "react-router-dom";

import "./style.css";

function Session(props) {
    const {date, showtimes} = props;

    return (
        <li className="Session">
            <h3>{date}</h3>
            <div className="session-times">
                {showtimes.map(({id, name}) => <Link to={`/sessao/${id}`} key={id}><button>{name}</button></Link>)}
            </div>
        </li>
    );
} 

export default Session;