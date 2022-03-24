import SeatsRow from "../SeatsRow";
import Footer from "../Footer";

import "./style.css";

function createSeatsLayout() {
    const seatsMap = [];
    let seatsRow = [];
    let seat = 0;
    for (let i = 0; i < 5; i++){
        seatsRow = [];
        for (let j = 0; j < 10; j++){
            seat++;
            seatsRow.push(seat.toString().padStart(2, '0'));
        }
        seatsMap.push(seatsRow);    
    }
    return seatsMap;
}

function Seats() {
    const seatsMap = createSeatsLayout();

    return (
        <div className="Seats">
            <main>
                <h2>Selecione o(s) assento(s)</h2>
                {seatsMap.map(seatsRow => <SeatsRow key={seatsRow} seatsRow={seatsRow}/>)}            
            </main>
            <Footer image={"teste"} title={"tres"} session="" />
        </div>
    );
}

export default Seats;