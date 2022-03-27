import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import SeatsRow from "../SeatsRow";
import Footer from "../Footer";
import Loading from "../Loading";

import { cpfMask } from "../cpfMask";

import "./style.css";

function createSeatsLayout({ seats }) {
    const seatsMap = [];
    let seatsRow = [];
    let seatCount = 0;
    for (let i = 0; i < 5; i++) {
        seatsRow = [];
        for (let j = 0; j < 10; j++) {
            seatsRow.push([seats[seatCount].name.padStart(2, '0'), seats[seatCount].isAvailable, seats[seatCount].id]);
            seatCount++;
        }
        seatsMap.push(seatsRow);
    }
    return seatsMap;
}

export default function Seats() {
    const [seatsInfo, setSeatsInfo] = useState({});
    const [names, setNames] = useState({});
    const [cpfs, setCPFs] = useState({});
    const [seatsSelected, setSeatsSelected] = useState({});


    const seats = Object.entries(seatsSelected);

    const { idSession } = useParams();
    const navigate = useNavigate();

    let seatsMap = [];

    // console.log(names);
    // console.log(cpfs);


    if (seatsInfo.seats) {
        seatsMap = createSeatsLayout(seatsInfo);
    }

    useEffect(() => {
        const promise = axios.get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSession}/seats`);
        promise.then(({ data }) => {
            setSeatsInfo(data);
            console.log(data);
        });
        promise.catch(error => console.log(error.response));
    }, [idSession]);

    function updateNameToSeat(value, seatNumber) {
        setNames(prevState => ({ ...prevState, [seatNumber]: value }));
    }

    function updateCPFToSeat(value, seatNumber) {
        setCPFs(prevState => ({ ...prevState, [seatNumber]: value }));
    }

    function confirmSeatsReservation(event) {
        event.preventDefault();
        const reservedSeats = [];
        const buyers = [];

        for (let i = 0; i < seats.length; i++) {
            if (seats[i][1]) {
                reservedSeats.push(Number(seats[i][0]));
            }
        }

        console.log(names, cpfs);
        console.log(reservedSeats);
        console.log(names[reservedSeats[0]]);

        for (let i = 0; i < reservedSeats.length; i++) {
            if (cpfs[reservedSeats[i]].length < 11) {
                alert("Preencha corretamento todo os campos de CPF.");
            } else {
                buyers.push({ idAssento: reservedSeats[i], nome: names[reservedSeats[i]], cpf: cpfs[reservedSeats[i]] });
                const promise = axios.post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", { ids: reservedSeats, compradores: buyers });
                promise.then(response => {
                    console.log(response);
                    navigate("/sucesso", { state: { postReservationInfo: { reservedSeats, buyers }, seatsInfo: seatsInfo } });
                });
                promise.catch(error => console.log(error.response));
            }
        }

        console.log(buyers);
    }

    return (
        <>
            {!seatsInfo.movie ? <Loading /> : (
                <div className="Seats">
                    <main>
                        <h2>Selecione o(s) assento(s)</h2>
                        {seatsMap.map(seatsRow => <SeatsRow key={seatsRow} seatsRow={seatsRow} setSeatsSelected={setSeatsSelected} />)}
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
                            {seats.length !== 0 ? (
                                <>
                                    {seats.map((seat, index) => {
                                        if (seat[1]) {
                                            return (
                                                <div key={index} className={seat[0]}>
                                                    <h2>Assento {seat[0] % 100 > 50 ? seat[0] % 100 - 50 : seat[0] % 100}</h2>
                                                    <h3>Nome do comprador:</h3>
                                                    <input name="name" type="text"
                                                        onChange={event => updateNameToSeat(event.target.value, seat[0])}
                                                        placeholder="Digite seu nome..."
                                                        value={names[seat[0]] ? names[seat[0]] : ""}
                                                        required
                                                    />
                                                    <h3>CPF do comprador:</h3>
                                                    <input name="CPF" type="text" onChange={event => {
                                                        event.target.value = cpfMask(event.target.value);
                                                        updateCPFToSeat(event.target.value.replace(/[^0-9]/g, ""), seat[0]);
                                                    }} placeholder="Digite seu CPF..." value={cpfs[seat[0]] ? cpfMask(cpfs[seat[0]]) : ""} required />
                                                </div>
                                            );
                                        } else {
                                            return false;
                                        }
                                    })}
                                </>
                            ) : <></>}

                            <button type="submit">Reservar assento(s)</button>
                        </form>
                    </main>
                    <Footer image={seatsInfo.movie.posterURL} title={seatsInfo.movie.title} session={`${seatsInfo.day.weekday} - ${seatsInfo.name}`} />
                </div>
            )}
        </>
    );
}