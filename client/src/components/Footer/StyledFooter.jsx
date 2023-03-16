import styled from 'styled-components';

const FooterMain = styled.div`
    margin-top: 50px;
`

const FooterSvg = styled.svg`
    display: block;
    filter: drop-shadow(0 0 10px black);
    width: 100%;
    height: 100%;
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
    }
`

const FooterLink = styled.div`

`

const FooterContact = styled.div`
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