import styled from 'styled-components'
import { Link } from 'react-router-dom'

const CardMain = styled(Link)`
    margin: 10px;
    background-color: #e9e9ed;
    padding: 0 10px;
    text-decoration: none;
    color: black;
    transition: 0.2s all linear;
    & > h2 {
        margin: 10px 0;
        text-align: center;
        color: black;
        padding-bottom: 10px;
        transition: 0.2s all linear;
        font-size: 22px;
    }    
    &:hover {
        & > h2 {
            /* color: white; */
        }
        /* background: radial-gradient(70% 40% at center top, rgb(21, 101, 192) 90%, white); */
        border-radius: 10px;
        transform: scale(1.04);
        box-shadow: black 0px 0px 3px;
    }
`
const CardImg = styled.div`
    img {
        width: 100%;
        height: auto;
        border-radius: 10px;
        filter: drop-shadow(rgb(0, 0, 0) 0px 0px 1px);
    }
`

const CardContinent = styled.div`
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    & > img {
        width: 40%;
    }
    & > h3 {
        margin: 0 10px;
        font-size: 16px;
    }
`



export {
    CardMain,
    CardImg,
    CardContinent,
}