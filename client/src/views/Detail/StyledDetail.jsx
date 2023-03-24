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
    background-color: white;
    border-radius: 0 0 10px 10px;
    padding: 10px 10px;
    display: flex;
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
    max-width: 30%;
    display: contents;
    img {
        max-width: auto;
        max-height: 25vh;
        filter: drop-shadow(#000000 0px 0px 5px);
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
        }
    }
`

const DetailActivitiesButton = styled.button`
    display: grid;
    align-items: stretch;
    grid-template-columns: repeat(4, 1fr);
    width: 90%;
    padding: 15px;
    margin: 10px auto;
    transition: 0.1s all linear;
    border: none;
    cursor: pointer;

    &:hover {
        transform: scale(1.03);
        box-shadow: 0 0 3px black;
        background: linear-gradient(140deg, rgb(21, 101, 192) 25%, white 30% 100%);;
        color: white;
        & > div {
            &:not(:first-child) {
                color: black;
            }
        }
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
}