import styled from 'styled-components'

const CardsMain = styled.div`
    min-height: 300px;
    margin-top: 30px;
`

const CardsDiv = styled.div`
    background-color: white;
    border-radius: 10px;
    padding: 10px;
    display: grid;
    align-items: stretch;
    grid-template-columns: repeat(5, 1fr);
`

const CardsBar = styled.div`
    width: 100%;
    margin: 0 auto;
    background-color: white;
    border-radius: 10px;
    display: flex;
    justify-content: space-evenly;
    padding: 10px 0;
    margin-bottom: 10px;
    border-bottom: 5px solid #b3b3b3;

    &:focus {
        outline: 2px solid #379c35;
    }
`

const CardsBarDiv = styled.div`
    display: inline-block;
    & > span {
        display: block;
        font-size: 14px;
        border-bottom: 1px solid #1565c0;
        margin-bottom: 5px;
    }
`

const CardsInput = styled.input`
    border-radius: 15px;
    font-size: 20px;
    border: none;
    background-color: #e7e7e7;
    outline: none;
    text-align: center;
    color: #707070;
    padding: 10px 15px;
    transition: 0.1s all linear;

    &:focus {
        outline: 2px solid #1565c0;
    }
`

const CardsButton = styled.button`
    font-size: 20px;
    margin: 0 5px 0 5px;
    background-color: ${props => (props.bgRed && '#e92a2a') || '#1565c0'};
    padding: 8px 8px;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    transition: 0.1s all linear;

    i {
        color: white;
    }

    &:hover {
        background-color: #242424;
    }
`

const CardsSelect = styled.select`
    font-size: 20px;
    border-radius: 15px;
    border: none;
    background-color: #e7e7e7;
    text-align: center;
    color: #707070;
    padding: 10px 15px;
    transition: 0.1s all linear;
    margin-left: 5px;
    option {
        background-color: #e7e7e7;
        &:first-child {
            font-size: 16px;
            font-weight: bold;
            color: #999999
        }
    }

    &:focus {
        outline: 2px solid #1565c0;
    }
`

const CardsPagination = styled.div`
    text-align: center;
    margin-bottom: 10px;
    background-color: #ffffff;
    padding: 5px 0;
    border-bottom: 5px solid #b3b3b3;
    border-radius: 10px;
`

const CardsButtonPage = styled.button`
    font-size: 18px;
    width: 35px;
    height: 38px;
    margin: 0 2px;
    border: none;
    cursor: pointer;
    transition: 0.1s all linear;
    &.active {
        background-color: #c5c5c5;
    }
`

export {
    CardsMain,
    CardsDiv,
    CardsBar,
    CardsBarDiv,
    CardsInput,
    CardsButton,
    CardsPagination,
    CardsButtonPage,
    CardsSelect
}