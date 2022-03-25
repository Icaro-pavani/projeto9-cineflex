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
            seatsRow.push([seatCount.toString().padStart(2, '0'), seats[seatCount - 1].isAvailable, seats[seatCount - 1].id]);
        }
        seatsMap.push(seatsRow);    
    }
    return seatsMap;
}

function Seats() {
    const [seatsInfo, setSeatsInfo] = useState({});
    const {idSession} = useParams();

    const seatsSelected = {};
    const postReservationObject = {};

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

    function confirmSeatsReservation() {
        const reservedSeats = [];
        const seats = Object.entries(seatsSelected);
        
        for (let i = 0; i < seats.length; i++) {
            if (seats[i][1]){
                reservedSeats.push(Number(seats[i][0]));
            }
        }

        if (!postReservationObject.name){
            alert("Preencha o campo de nome.");
        } else if (!postReservationObject.cpf || !/\d{3}\.?\d{3}\.?\d{3}-?\d{2}/.test(postReservationObject.cpf)){
            alert("Preencha o campo de CPF");
        } else if (reservedSeats.length === 0){
            alert("Selecione ao menos um assento")
        } else {
            postReservationObject.ids = reservedSeats;
            const promise = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", postReservationObject);
            promise.then(response => console.log(response));
            promise.catch(error => console.log(error.response));
        }


        
    }

    return (
        <div className="Seats">
            <main>
                <h2>Selecione o(s) assento(s)</h2>
                {seatsMap.length === 0 ? "Carregando..." : seatsMap.map(seatsRow => <SeatsRow key={seatsRow} seatsRow={seatsRow} seatsSelected={seatsSelected}/>)}
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
                <div className="form">
                    <h3>Nome do comprador:</h3>
                    <input name="name" type="text" onChange={event => postReservationObject.name = event.target.value} placeholder="Digite seu nome..." />
                    <h3>CPF do comprador:</h3>
                    <input name="CPF" type="text" onChange={event => postReservationObject.cpf = event.target.value} placeholder="Digite seu CPF..." />
                    <button onClick={() => confirmSeatsReservation(seatsSelected)}>Reservar assento(s)</button>
                </div>           
            </main>
            {!seatsInfo.movie ? "Carregando..." : <Footer image={seatsInfo.movie.posterURL} title={seatsInfo.movie.title} session={`${seatsInfo.day.weekday} - ${seatsInfo.name}`} />}
        </div>
    );
}

export default Seats;