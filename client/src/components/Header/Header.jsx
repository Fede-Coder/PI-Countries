import { HeaderMain, HeaderBar, HeaderLink, HeaderBG, HeaderLogo } from './StyledHeader';
import { Wrapper } from '../../assets/css/styledGlobal';
import logo from '../../assets/img/logo_countries.png'
import iconInstagram from '../../assets/icons/instagram.svg'
import iconTwitter from '../../assets/icons/twitter.svg'
import iconYoutube from '../../assets/icons/youtube.svg'

export default function Header() {
    return(
        <HeaderMain>
            <HeaderBar>
                <Wrapper>
                    <HeaderLink to={'https://www.instagram.com/'} target={'_blank'}><img src={iconInstagram} alt={'iconInstagram'} /></HeaderLink>
                    <HeaderLink to={'https://twitter.com/'} target={'_blank'}><img src={iconTwitter} alt={'iconTwitter'} /></HeaderLink>
                    <HeaderLink to={'https://www.youtube.com/'} target={'_blank'}><img src={iconYoutube} alt={'iconYoutube'} /></HeaderLink>
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