import styled from 'styled-components';

const FooterMain = styled.div`
    margin-top: 50px;
`

const FooterSvg = styled.svg`
    display: block;
    filter: drop-shadow(0 0 10px black);
    width: 100%;
    height: 100%;
    margin-bottom: -1px;
`

const FooterDiv = styled.div`
    padding-top: 20px;
    position: relative;
    background-color: #888888;
    & > div {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        gap: 2rem;
        justify-content: space-around;
    }

    & > img {
        position: absolute;
        max-width: 18vw;
        bottom: 10px;
        right: 10px;
        filter: invert(20%) sepia(10%) saturate(500%) hue-rotate(175deg);
        opacity: 0.6;
        rotate: -10deg;
        @media (max-width: 650px) {
            max-width: 30vw;
        }
        @media (max-width: 350px) {
            max-width: 60vw;
        }
    }
`

const FooterLogo = styled.div`
    img {
        filter: grayscale(100%) drop-shadow(1px 1px 1px #000);
        width: 200px;
        transition: 0.2s all linear;

        :hover {
            filter: grayscale(0%) drop-shadow(1px 1px 1px #000);
        }
    }
    p {
        width: 300px;
        text-align: justify;
        border-top: 2px solid #202020;
    }
`

const FooterLink = styled.div`
    & > ul {
        padding: 0;
        & > li {
        list-style-type: none;
        margin-bottom: 20px;
        & > a {
            font-size: 18px;
            text-decoration: none;
            font-weight: 500;
            color: white;
            display: flex;
            transition: 0.1s all linear;
            & > img {
                margin: 0 10px;
                width: 1.5em;
            }
            &:hover {                
                filter: invert(1);
            }
        }
    }
    }
`

const FooterContact = styled.div`
    & > ul {
        padding: 0;
        & > li {
            list-style-type: none;            
            margin-bottom: 20px;
            display: flex;
            & > img {
                width: 1.5em;
                margin: 0 10px;
            }
        }
    }
`

const FooterCopyright = styled.div`
    background-color: rgb(153, 153, 153);
    padding: 15px 0;
    text-align: center;
    h3 {
        margin: 0;
        color: #3d3d3d; 
    }
    a {
        text-decoration: none;
        color: #575757;
        transition: 0.2s all linear;
        &:hover {
            color: #000
        }
    }
`

export {
    FooterMain,
    FooterSvg,
    FooterDiv,
    FooterLogo,
    FooterLink,
    FooterContact,
    FooterCopyright
}