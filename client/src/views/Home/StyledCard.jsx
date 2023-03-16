import styled from 'styled-components'
import { Link } from 'react-router-dom'

const CardMain = styled(Link)`
    margin: 10px;
    background-color: #dfdfdf;
    padding: 0 10px;
    border-radius: 10px;
    border-bottom: 5px solid #a8a8a8;
    text-decoration: none;
    color: black;
    transition: 0.2s all linear;
    &:hover {
        transform: scale(1.1);
    }
`
const CardImg = styled.div`
    img {
        width: 100%;
        height: auto;
        object-fit: cover;
    }
`



export {
    CardMain,
    CardImg
}