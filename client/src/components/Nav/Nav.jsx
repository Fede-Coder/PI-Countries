import { Wrapper } from '../../assets/css/styledGlobal';
import { NavALink, NavMain, NavMenu } from './StyledNav';
import iconHome from '../../assets/icons/home.svg'
import iconActivity from '../../assets/icons/activity.svg'

export default function Nav() {
    return(
        <NavMain>
            <Wrapper>                
                <NavMenu>
                    <NavALink to={'/home'}><img src={iconHome} alt={'iconHome'} />Home</NavALink>
                    <NavALink to={'/activity'}><img src={iconActivity} alt={'iconActivity'} />Activity</NavALink>
                </NavMenu>
            </Wrapper>
        </NavMain>
    )
}