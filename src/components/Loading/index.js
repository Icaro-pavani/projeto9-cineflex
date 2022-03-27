import styled from "styled-components";

import Load from "./assets/Load.svg";

export default function Loading(){
    return (
        <LoadScreen>
            <img src={Load} alt="Load symbol" />
        </LoadScreen>
    );
}

const LoadScreen = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;