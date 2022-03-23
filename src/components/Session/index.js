import "./style.css";

function Session(props) {
    const {session} = props;

    return (
        <li className="Session">
            <h3>{session.date}</h3>
            <div className="session-times">
                {session.time.map((time, index) => <button key={index}>{time}</button>)}
            </div>
        </li>
    );
} 

export default Session;