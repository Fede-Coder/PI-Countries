import { NavALink, NavMain } from './StyledNav';

export default function Nav() {
    return(
        <NavMain>
            <NavALink to={'/home'}>Home</NavALink>
            <NavALink to={'/activity'}>Activity</NavALink>
        </NavMain>
    )
}