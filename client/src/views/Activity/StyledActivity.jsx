import styled from 'styled-components';

const ActivityMain = styled.div`
    min-height: 300px;
    margin-top: 30px;
    & > div {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
    }
`

const ActivityDivLeft = styled.div`
    width: 30%;
`

const ActivityDivRight = styled.form`
    width: 65%;
`

const ActivityTitle = styled.h1`
    margin: 0;
    color: black;
    border-bottom: 2px solid #1565c0;
    background-color: #ffffff;
    padding: 5px 15px;
    border-radius: 10px 10px 0 0;
`

const ActivityForm = styled.form`
    background-color: white;
    border-radius: 0 0 10px 10px;
    padding: 10px 10px;

    & > span {
        display: block;
        font-size: 14px;
        border-bottom: 1px solid #1565c0;
        margin-bottom: 5px;
    }
`

const ActivityDiv = styled.div`
    background-color: white;
    border-radius: 0 0 10px 10px;
    padding: 10px 10px;
`

const ActivityInputText = styled.input`
    border-radius: 15px;
    font-size: 20px;
    border: none;
    background-color: #e7e7e7;
    outline: none;
    text-align: center;
    color: #707070;
    padding: 10px 0px;
    transition: 0.1s all linear;
    margin: 10px 0;
    width: 100%;
`

const ActivityInputRange = styled.input`
    margin: 10px 0;
    width: 100%;
`

const ActivitySelect = styled.select`
    font-size: 20px;
    border-radius: 15px;
    border: none;
    background-color: #e7e7e7;
    color: #707070;
    padding: 10px 15px;
    transition: 0.1s all linear;
    width: 100%;
    margin: 10px 0;
    option {
        background-color: #e7e7e7;
    }
`

const ActivitySelectCountry = styled.div`
    & > input {
        width: 90%;
        border-radius: 15px 0 0 15px;
    }
    & > button {
        width: 10%;
        border-radius: 0 15px 15px 0;
        border: none;
        font-size: 20px;
        padding: 10px 0;
        background-color: #1565c0;
        color: white;
        cursor: pointer;
        transition: 0.1s all linear;
        &:hover {
            background-color: #242424;
        }
    }

    & > div {
        
    }
`

const ActivityButton = styled.button`
    font-size: 20px;
    background-color: #1565c0;
    padding: 10px 12px;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    transition: 0.1s all linear;
    color: white;
    width: 100%;

    &:hover {
        background-color: #242424;
    }
`


export {
    ActivityMain,
    ActivityForm,
    ActivityDiv,
    ActivityTitle,
    ActivityInputText,
    ActivityInputRange,
    ActivitySelect,
    ActivityButton,
    ActivityDivLeft,
    ActivityDivRight,
    ActivitySelectCountry,
}