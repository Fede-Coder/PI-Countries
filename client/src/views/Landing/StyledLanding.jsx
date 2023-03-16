import styled from 'styled-components'

const LandingMain = styled.div`
    background-color: #ffffff;
    margin-top: 30px;
    border-radius: 10px;
    box-shadow: rgba(5, 5, 5, 0.36) 5px 5px 5px;    
    min-height: 200px;
    text-align: center;
    & > img {
        width: 80%;
        padding: 50px 0;
    }
`

const LandingH1 = styled.h1`
    color: #0d65d8;
    text-align: center;
    padding-top: 30px;
    margin: 0;
    text-decoration-line: underline;
`

export {
    LandingMain,
    LandingH1
}