import styled from 'styled-components'

const DetailMain = styled.div`
    min-height: 300px;
    margin-top: 30px;
`

const DetailButton = styled.button`
    font-size: 20px;
    margin: 0 0 10px 0 ;
    background-color: #ffffff;
    padding: 10px 12px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.1s all linear;
    color: #000000;

    &:hover {
        background-color: #444444;
        color: white;
    }
`

const DetailDiv = styled.div`
    position: relative;
    background-color: white;
    border-radius: 0 0 10px 10px;
    padding: 10px 10px;
    display: flex;

    @media (max-width: 700px) {
        display: block;
    }
`
const DetailTitle = styled.h1`
    margin: 0;
    color: black;
    border-bottom: 2px solid #1565c0;
    background-color: #ffffff;
    padding: 5px 15px;
    border-radius: 10px 10px 0 0;
    margin-top: 20px;
`

const DetailImg = styled.div`
    max-width: 100%;
    display: contents;
    img {
        max-width: auto;
        max-height: 25vh;
        border-radius: 10px;
        filter: drop-shadow(#000000 0px 0px 5px);
    }
    
    @media (max-width: 700px) {
        display: block;
        text-align: center;
        margin-bottom: 15px;
    }
`

const DetailInfo = styled.div`
    margin-left: 15px;
    border-left: 3px solid #1565c0;
    & > h1 {
        margin: 0 10px;
        text-decoration: underline;
    }

    & > ul > li {
        font-size: 20px;
        margin-bottom: 10px;
    }

    & > ul > li > span {
        text-decoration: underline;
    }
    

    @media (max-width: 700px) {
        display: block;
        width: 100%;
        border-top: 3px solid #1565c0;
        border-left: none;
        margin-left: 0px;
    }
`

const DetailActivitiesDiv = styled.div`
    background-color: white;
    border-radius: 0 0 10px 10px;
    padding: 10px;

    & > div {
        display: grid;
        align-items: stretch;
        grid-template-columns: repeat(4, 1fr);
        width: 90%;
        margin: 0 auto;
        text-align: center;
        & > h3 {
            margin: 0;            
            @media (max-width: 500px) {
                font-size: 14px;
            }
        }
    }
`

const DetailActivitiesButton = styled.button`
    display: grid;
    align-items: center;
    grid-template-columns: repeat(4, minmax(25%, 1fr));
    width: 90%;
    padding: 15px;
    margin: 10px auto;
    transition: 0.1s all linear;
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: 500;
    

    & > div > img {
        width: 30px;
    }

    &:hover {
        transform: scale(1.03);
        box-shadow: 0 0 3px black;
        background: linear-gradient(140deg, rgb(21, 101, 192) 25%, white 30% 100%);
        border-radius: 10px;
        & > div {
            &:first-child {
                color: white;
            }
        }
        
        @media (max-width: 620px) {
            background: linear-gradient(140deg, rgb(21, 101, 192) 30%, white 35% 100%);
        }
    }
`

const DetailActivitiesButtonDiv = styled.div`
    overflow-wrap: break-word;
    ${props => props.isBar && `
    width: 60%;
    height: 50%;
    margin: 0 auto;
    background: #858585;
    border: 2px solid #414141;
    border-radius: 15px;
    position: relative;
    & > span {
        color: white;
        position:absolute;
        top: 50%;
        transform: translate(-50%, -50%);
        
    }
    & > div {
        background: ${(props.valueDiff === 5 && '#ff2020') || (props.valueDiff === 4 && '#ff8c20') || (props.valueDiff === 3 && '#ffc400') || (props.valueDiff === 2 && '#1ea81e') || '#2ddb2d'};
        width: ${props.valueDiff*20}%;
        border-radius: 15px;
        height: 100%;
    }
    `}
`

const DetailContinent = styled.div `
    & > img {
        position: absolute;
        max-width: 10vw;
        opacity: 0.7;
        right: 10px;
        bottom: 10px;
    }
`

export {
    DetailMain,
    DetailButton,
    DetailDiv,
    DetailTitle,
    DetailImg,
    DetailInfo,
    DetailActivitiesDiv,
    DetailActivitiesButton,
    DetailActivitiesButtonDiv,
    DetailContinent,
}