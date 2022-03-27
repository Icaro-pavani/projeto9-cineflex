import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import SeatsRow from "../SeatsRow";
import Footer from "../Footer";
import { cpfMask } from "../cpfMask";

import "./style.css";

function createSeatsLayout({seats}) {
    const seatsMap = [];
    let seatsRow = [];
    let seatCount = 0;
    for (let i = 0; i < 5; i++){
        seatsRow = [];
        for (let j = 0; j < 10; j++){
            seatsRow.push([seats[seatCount].name.padStart(2, '0'), seats[seatCount].isAvailable, seats[seatCount].id]);
            seatCount++;
        }
        seatsMap.push(seatsRow);    
    }
    return seatsMap;
}

export default function Seats() {
    const [seatsInfo, setSeatsInfo] = useState({});
    const [name, setName] = useState("");
    const [cpf, setCPF] = useState("");
    const [seatsSelected, setSeatsSelected] = useState({});


    const seats = Object.entries(seatsSelected);
    console.log(seats);

    const {idSession} = useParams();
    const navigate = useNavigate();

    let seatsMap = [];
    
    if (seatsInfo.seats){
        seatsMap = createSeatsLayout(seatsInfo);
    }

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSession}/seats`);
        promise.then(({data}) => {
            setSeatsInfo(data);
            console.log(data);
        });
        promise.catch(error => console.log(error.response));
    },[idSession]);

    function confirmSeatsReservation(event) {
        event.preventDefault();        
        const reservedSeats = [];
        
        console.log(seats);
        
        for (let i = 0; i < seats.length; i++) {
            if (seats[i][1]){
                reservedSeats.push(Number(seats[i][0]));
            }
        }

        if (!name){
            alert("Preencha o campo de nome.");
        } else if (!cpf || cpf.length < 11){
            alert("Preencha o campo de CPF");
        } else if (reservedSeats.length === 0){
            alert("Selecione ao menos um assento")
        } else {
            console.log(seats);
            const promise = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", {ids: reservedSeats, name: name, cpf: cpf});
            promise.then(response => {
                console.log(response);
                navigate("/sucesso", {state : {postReservationInfo:{name, cpf, reservedSeats}, seatsInfo: seatsInfo}});
            });
            promise.catch(error => console.log(error.response));
        }


        
    }

    return (
        <div className="Seats">
            <main>
                <h2>Selecione o(s) assento(s)</h2>
                {seatsMap.length === 0 ? "Carregando..." : seatsMap.map(seatsRow => <SeatsRow key={seatsRow} seatsRow={seatsRow} setSeatsSelected={setSeatsSelected}/>)}
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
                <form onSubmit={confirmSeatsReservation}>
                    <h3>Nome do comprador:</h3>
                    <input name="name" type="text" onChange={event => setName(event.target.value)} placeholder="Digite seu nome..." value={name} required/>
                    <h3>CPF do comprador:</h3>
                    <input name="CPF" type="text" onChange={event => {
                        event.target.value = cpfMask(event.target.value); 
                        setCPF(event.target.value.replace(/[^0-9]/g, ""));
                    }} placeholder="Digite seu CPF..." value={cpfMask(cpf)} required />
                    <button type="submit">Reservar assento(s)</button>
                </form>           
            </main>
            {!seatsInfo.movie ? "Carregando..." : <Footer image={seatsInfo.movie.posterURL} title={seatsInfo.movie.title} session={`${seatsInfo.day.weekday} - ${seatsInfo.name}`} />}
        </div>
    );
}