import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavMain = styled.div`
    border-top: 1px solid #ababab;
    background-color: #535353;
    border-bottom: 5px solid #ababab;
`

const NavMenu = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
`

const NavALink = styled(NavLink)`
    color: white;
    text-decoration: none;
    padding: 10px 5px;
    display: inline-block;
    font-size: 30px;
    position: relative;
    transition: 0.5s all ease-in-out;

    &.active {
        background-color: rgb(52, 51, 51);
    }

    &:hover {        
        background-color: rgb(52, 51, 51);        
    }

    &:hover:after, &.active:after {
        content: "";
        position: absolute;
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        border-bottom: 5px solid #ababab;
        bottom: 0;
        left: 0;
        right: 0;
        height: 10px;
        
    }
`

export {
    NavMain,
    NavMenu,
    NavALink
}