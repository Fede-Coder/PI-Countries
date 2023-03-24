import { Wrapper } from '../../assets/css/styledGlobal';
import { FooterContact, FooterCopyright, FooterDiv, FooterLink, FooterLogo, FooterMain, FooterSvg } from './StyledFooter';
import Logo from '../../assets/img/logo_countries.png'
import { Link } from 'react-router-dom'

export default function Footer() {
    return(
        <FooterMain>
            <FooterSvg id="visual" viewBox="0 0 1980 90" width="1980" height="90" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><path d="M0 76L1980 27L1980 91L0 91Z" fill="rgb(136, 136, 136)" strokeLinecap="square" strokeLinejoin="bevel"></path></FooterSvg>
            <FooterDiv>
                <Wrapper>
                    <FooterLogo>
                        <img src={Logo} alt='logo'></img>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fringilla enim et nunc porta, in pharetra ipsum pulvinar. Pellentesque eleifend ullamcorper dui, et malesuada urna sodales id.
                        </p>
                    </FooterLogo>
                    <FooterLink>
                        <h3>Useful links</h3>
                        <ul>
                            <li>Home</li>
                            <li>Activity</li>
                        </ul>
                    </FooterLink>
                    <FooterContact>
                        <h3>Contact</h3>
                        <ul>
                            <li>Argentina</li>
                            <li>info@example.com</li>
                        </ul>
                    </FooterContact>
                </Wrapper>
            </FooterDiv>
            <FooterCopyright>
                <Wrapper>
                    <h3>© 2023 Copyright - Developer and designed by <Link to={'https://github.com/Fede-Coder'} target={'_blank'}>Fede-Coder</Link></h3>
                </Wrapper>
            </FooterCopyright>
        </FooterMain>
    )
}