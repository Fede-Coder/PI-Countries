import styled from "styled-components";

const ModalMain = styled.div`
    ${props => props.showModal ? `` : `display: none`}
    position: fixed;
    z-index: 9999;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #3f3f3f94;
`

const ModalDiv = styled.div`
    width: 100%;
    max-width: 450px;
`

const ModalTitle = styled.h2`
    color: black;
    border-bottom: 2px solid rgb(21, 101, 192);
    background-color: rgb(255, 255, 255);
    padding: 5px 15px;
    border-radius: 10px 10px 0px 0px;
    margin: 0;
`

const ModalContent = styled.div`
    background-color: white;
    border-radius: 0px 0px 10px 10px;
    padding: 10px;

    & > p {
        & > span {
            text-decoration: underline;
        }
    }
    
    & > div {
        width: 100%;
        display: flex;
        justify-content: end;
        & > button {
            border: none;
            font-size: 18px;
            margin: 5px;
            padding: 10px 10px;
            background: #e2e2e2;
            color: black;
            cursor: pointer;
            border-radius: 5px;
            transition: all 0.1s linear 0s;
            &:hover {
                background: rgb(36, 36, 36);
                color: white;                
            }
        }

        & > button.delete {            
            background: #e64d4d;
            color: #ffffff;
            &:hover {
                background: rgb(36, 36, 36);
            }
        }

        & > button.update {
            ${props => props.isEqualInputOldNew ?
            `
            background: #9fa4aa;
            color: white;
            cursor: default;
            `
            :
            `
            background: #1565c0;
            color: #ffffff;
            &:hover {
                background: rgb(36, 36, 36);
                color: white;                
            }
            `
            }
        }
    }
`

const ModalForm = styled.form`
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

const ModalInputText = styled.input`
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

const ModalInputRange = styled.input`
    margin: 10px 0;
    width: 100%;
    ${props => props.disabled && `cursor: not-allowed;`}
`

const ModalSelect = styled.select`
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

const ModalSelectCountry = styled.div`
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

    
`

const ModalListCountries = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: stretch;
    align-content: flex-start;
    flex-direction: row;
    width: 100%;
    margin-bottom: 10px;
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
`


export {
    ModalMain,
    ModalDiv,
    ModalTitle,
    ModalContent,
    ModalForm,
    ModalInputText,
    ModalInputRange,
    ModalSelect,
    ModalSelectCountry,
    ModalListCountries
}