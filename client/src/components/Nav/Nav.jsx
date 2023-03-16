import { Wrapper } from '../../assets/css/styledGlobal';
import { NavALink, NavMain, NavMenu } from './StyledNav';

export default function Nav() {
    return(
        <NavMain>
            <Wrapper>                
                <NavMenu>
                    <NavALink to={'/home'}>Home</NavALink>
                    <NavALink to={'/activity'}>Activity</NavALink>
                </NavMenu>
            </Wrapper>
        </NavMain>
    )
}