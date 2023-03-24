import styled, { keyframes } from "styled-components"

const loadingCircle = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

const LoadingSpan = styled.span`
    ${props => props.isFetching ? `display: inline-block;` : `display: none;`}
    margin-inline-end: 8px;
    animation: ${loadingCircle} 1s infinite linear;
    color: inherit;
    font-style: normal;
    line-height: 0;
    text-align: center;
    text-transform: none;
    vertical-align: -.125em;
    text-rendering: optimizeLegibility;
    opacity: 0.7;
`

export {
    LoadingSpan
}