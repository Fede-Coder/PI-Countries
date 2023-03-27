import styled from 'styled-components'

const NotFoundMain = styled.div`
    background-color: #ffffff;
    margin-top: 30px;
    border-radius: 10px;
    box-shadow: rgba(5, 5, 5, 0.36) 5px 5px 5px;    
    min-height: 200px;
    text-align: center;

    & > h1 {
        text-align: center;
        padding-top: 30px;
        margin: 0;
    }
    & > img {
        max-width: 25vw;
    }
`

export {
    NotFoundMain
}