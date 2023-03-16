import { HeaderMain, HeaderBar, HeaderLink, HeaderBG, HeaderLogo } from './StyledHeader';
import { Wrapper } from '../../assets/css/styledGlobal';
import logo from '../../assets/img/logo_countries.png'

export default function Header() {
    return(
        <HeaderMain>
            <HeaderBar>
                <Wrapper>
                    <HeaderLink to={'https://www.instagram.com/'} target={'_blank'}><i className="fa-brands fa-square-instagram"></i></HeaderLink>
                    <HeaderLink to={'https://twitter.com/'} target={'_blank'}><i className="fa-brands fa-square-twitter"></i></HeaderLink>
                    <HeaderLink to={'https://www.youtube.com/'} target={'_blank'}><i className="fa-brands fa-square-youtube"></i></HeaderLink>
                </Wrapper>
            </HeaderBar>
            <HeaderBG>
                <HeaderLogo>
                    <img src={logo} alt='countries' />
                </HeaderLogo>
            </HeaderBG>
        </HeaderMain>
    )
}