import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";

import { cpfMask } from "../cpfMask";

function Success(props) {
    const {setConfirmBackButton} = props;
    const {state} = useLocation();
    const {postReservationInfo, seatsInfo} = state;
    const {name, cpf, reservedSeats} = postReservationInfo;
    const {day, movie} = seatsInfo;
    const navigate = useNavigate();

    setConfirmBackButton(true);

    console.log(postReservationInfo);

    return (
        <Confirmation>
            <h2>Pedido feito com sucesso!</h2>
            <PurchaseInfo>
                <h3>Filme e sessão</h3>
                <p>{movie.title}</p>
                <p>{day.date} {seatsInfo.name}</p>
            </PurchaseInfo>
            <PurchaseInfo>
                <h3>Ingressos</h3>
                {reservedSeats.map(seat => <p key={seat}>Assento {seat % 100 > 50 ? (seat % 100 - 50) : seat % 100}</p>)}
            </PurchaseInfo>
            <PurchaseInfo>
                <h3>Comprador</h3>
                <p>Nome: {name}</p>
                <p>CPF: {cpfMask(cpf)}</p>
            </PurchaseInfo>
            <button onClick={() => navigate("/")} >Voltar pra Home</button>
        </Confirmation>
    )
}

export default Success;

const Confirmation = styled.div`
    position: relative;
    top: 67px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
        color: #247a6b;
        font-size: 24px;
        font-weight: bold;
        line-height: 28px;
        letter-spacing: 0.04em;
        text-align: center;
        padding: 27px 25%;
    }

    button {
        width: 225px;
        height: 42px;
        font-family: 'Roboto', sans-serif;
        font-size: 18px;
        line-height: 21px;
        letter-spacing: 0.04em;
        color: #fff;
        background-color: #e8833a;
        border: none;
        border-radius: 3px;
        margin-top: 82px;
    }
`;

const PurchaseInfo = styled.div`
    width: 100%;
    padding: 0 8%;

    h3 {
        color: #293845;
        font-size: 24px;
        line-height: 28px;
        font-weight: bold;
        letter-spacing: 0.04em;
        margin-top: 20px;
        margin-bottom: 8px;
    }

    p {
        color: #293845;
        font-size: 22px;
        line-height: 26px;
        letter-spacing: 0.04em;
    }
`;