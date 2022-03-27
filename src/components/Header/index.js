import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import styled from "styled-components";

function Header(props) {
    const [confirmBackButton, setConfirmBackButton] = useState(false);

    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/"){
            setConfirmBackButton(false);
        } else {
            setConfirmBackButton(true);
        }
    },[location])
    
    const navigate = useNavigate();

    return (
        <HeaderDiv>
            {confirmBackButton ? <ion-icon name="arrow-back-sharp" onClick={() => navigate(-1)}></ion-icon> : <></>}
            <h1>{props.title}</h1>
        </HeaderDiv>
    );
}

export default Header;

const HeaderDiv = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 34px;
    line-height: 40px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 67px;
    color: #e8833a;
    background-color: #c3cfd9;
    z-index: 1;

    ion-icon {
        position: absolute;
        top: 16px;
        left: 20px;
        cursor: pointer;
    }
`;