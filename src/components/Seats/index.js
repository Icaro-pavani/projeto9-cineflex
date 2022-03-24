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
                <div className="seat-info">
                    <div className="example-circle">
                        <div className="circle selected"></div>
                        <p>Selecionado</p>
                    </div>
                    <div className="example-circle">
                        <div className="circle available"></div>
                        <p>Disponível</p>
                    </div>
                    <div className="example-circle">
                        <div className="circle unavailable"></div>
                        <p>Indisponível</p>
                    </div>
                </div> 
                <form>
                    <h3>Nome do comprador:</h3>
                    <input name="nome" type="text" placeholder="Digite seu nome..." />
                    <h3>CPF do comprador:</h3>
                    <input name="CPF" type="text" placeholder="Digite seu CPF..." />
                    <input className="submit" type="submit" value="Reservar assento(s)" />
                </form>           
            </main>
            <Footer image={"teste"} title={"tres"} session="" />
        </div>
    );
}

export default Seats;