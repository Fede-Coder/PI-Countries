import styled from 'styled-components';
import { Link } from 'react-router-dom'
import headerImg from '../../assets/img/23322.jpg'

const HeaderMain = styled.div`
`

const HeaderBar = styled.div`
    background-color: #535353;
    border-bottom: 3px solid #ababab;
`

const HeaderLink = styled(Link)`
    color: white;
    font-size: 60px;
    margin: 0 10px 0 0;
    transition: 0.2s all linear;

    & > img {
        width: 1em;
        height: auto;
        filter: invert(1);
    }

    &:hover {
        background-color: rgb(52, 51, 51);
    }
`

const HeaderBG = styled.div`
    background: url(${headerImg});
    background-position: center; 
    background-size: 100%;
`

const HeaderLogo = styled.div`
    text-align: center;
    padding: 80px 0;
    backdrop-filter: hue-rotate(320deg) blur(2px) brightness(60%);

    img {
        max-width: 100%;
        filter: drop-shadow(rgba(0, 0, 0, 0.82) 5px 5px 10px);
    }

`

export {
    HeaderMain,
    HeaderBar,
    HeaderLink,
    HeaderBG,
    HeaderLogo
}