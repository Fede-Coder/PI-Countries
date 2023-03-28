import styled from 'styled-components';

const ActivityMain = styled.div`
    min-height: 300px;
    margin-top: 30px;
    & > div {
        display: flex;
        flex-flow: row wrap;
        gap: 2rem;
        justify-content: space-between;
    }
`

const ActivityDivLeft = styled.div`
    width: 30%;
    @media (max-width: 620px) {
        width: 100%;
    }
`

const ActivityDivRight = styled.form`
    width: 65%;
    @media (max-width: 620px) {
        width: 100%;
    }
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

    & label {
        display: block;
        font-size: 14px;
        border-bottom: 1px solid #1565c0;
        margin-bottom: 5px;
    }

    & > span {
        color: red;
        font-size: 10px;
    }
`

const ActivityDiv = styled.div`
    background-color: white;
    border-radius: 0 0 10px 10px;
    padding: 10px 10px;

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

    ${props => !props.activities && `
        display: flex;
        align-items:center;
        justify-content: center;
        & > img {
            max-width: 100px;
        }
        & > h1 {
            text-align: center
        }
    `}
    
`

const ActivitiesButton = styled.button`
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
        background: linear-gradient(140deg, rgb(21, 101, 192) 30%, white 35% 100%);
        border-radius: 10px;
        & > div {
            &:first-child {
                color: white;
            }
        }
    }
`

const ActivitiesButtonDiv = styled.div`
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
    ${props => props.disabled && `cursor: not-allowed;`}

    ${props => props.isError
    ? 
    `
    outline: rgb(228, 57, 57) solid 2px;
    background-color: #ffb4b4;
    `
    : ``}
`

const ActivityInputRange = styled.input`
    margin: 10px 0;
    width: 100%;
    ${props => props.disabled && `cursor: not-allowed;`}
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
    ${props => props.disabled && `cursor: not-allowed;`}
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
        ${props => props.disabled && `
        cursor: not-allowed;
        background-color: #242424;
        `}
        transition: 0.1s all linear;
        &:hover {
            background-color: #242424;
        }
    }

    & > div {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
        align-items: stretch;
        align-content: flex-start;
        flex-direction: row;
        width: 100%;
        & > button {
            border: none;
            cursor: pointer;
            padding: 10px 0px;
            background-color: transparent;
            transition: 0.1s all linear;
            & > img {
                width: 80px;
                vertical-align: middle;
                border-radius: 3px;
                filter: drop-shadow(rgb(0, 0, 0) 0px 0px 3px);
                transition: 0.1s all linear;
                transform: scale(.7);
            }

            &:hover {
                background-color: #fa3c2e47;
                & > img {                    
                    transform: scale(1.0);
                }
            }
        }
        margin-bottom: 10px;
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
    margin-top: 10px;

    &:hover {
        background-color: #242424;
    }
    
    ${props => props.disabled && `
    cursor: not-allowed;
    background-color: #242424;
    `}
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
    ActivitiesButton,
    ActivitiesButtonDiv
}