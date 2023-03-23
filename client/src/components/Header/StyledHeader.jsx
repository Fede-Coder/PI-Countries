import styled from 'styled-components';
import { Link } from 'react-router-dom'
import headerImg from '../../assets/img/bg_header.jpg'

const HeaderMain = styled.div`
`

const HeaderBar = styled.div`
    background-color: #535353;
    border-bottom: 3px solid #ababab;
`

const HeaderLink = styled(Link)`
    color: white;
    font-size: 40px;
    margin: 0 10px 0 0;
`

const HeaderBG = styled.div`
    background-image: url(${headerImg});
    background-size: cover;
`

const HeaderLogo = styled.div`
    text-align: center;
    padding: 80px 0;

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