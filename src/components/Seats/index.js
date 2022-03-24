import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import SeatsRow from "../SeatsRow";
import Footer from "../Footer";

import "./style.css";

function createSeatsLayout({seats}) {
    const seatsMap = [];
    let seatsRow = [];
    let seatCount = 0;
    console.log(seats);
    for (let i = 0; i < 5; i++){
        seatsRow = [];
        for (let j = 0; j < 10; j++){
            seatCount++;
            seatsRow.push([seatCount.toString().padStart(2, '0'), seats[seatCount - 1].isAvailable]);
        }
        seatsMap.push(seatsRow);    
    }
    return seatsMap;
}

function Seats() {
    const [seatsInfo, setSeatsInfo] = useState({});
    const {idSession} = useParams();

    let seatsMap = [];

    if (seatsInfo.seats){
        seatsMap = createSeatsLayout(seatsInfo);
        console.log(seatsMap);
    }

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSession}/seats`);
        promise.then(({data}) => {
            setSeatsInfo(data);
            console.log(data);
        });
        promise.catch(error => console.log(error.response));
    },[idSession]);

    return (
        <div className="Seats">
            <main>
                <h2>Selecione o(s) assento(s)</h2>
                {seatsMap.length === 0 ? "Carregando..." : seatsMap.map(seatsRow => <SeatsRow key={seatsRow} seatsRow={seatsRow}/>)}
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
            {!seatsInfo.movie ? "Carregando..." : <Footer image={seatsInfo.movie.posterURL} title={seatsInfo.movie.title} session={`${seatsInfo.day.weekday} - ${seatsInfo.name}`} />}
        </div>
    );
}

export default Seats;