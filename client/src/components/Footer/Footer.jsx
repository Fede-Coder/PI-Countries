import { Link } from 'react-router-dom'

import { Wrapper } from '../../assets/css/styledGlobal';
import { FooterContact, FooterCopyright, FooterDiv, FooterLink, FooterLogo, FooterMain, FooterSvg } from './StyledFooter';

import Logo from '../../assets/img/logo_countries.png'
import WorldMap from '../../assets/img/world_map.svg'
import iconHome from '../../assets/icons/home.svg'
import iconActivity from '../../assets/icons/activity.svg'
import iconLocation  from '../../assets/icons/location.svg'
import iconEmail  from '../../assets/icons/email.svg'

export default function Footer() {
    return(
        <FooterMain>
            <FooterSvg id="visual" viewBox="0 0 1980 90" width="1980" height="90" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1"><path d="M0 76L1980 27L1980 91L0 91Z" fill="rgb(136, 136, 136)" strokeLinecap="square" strokeLinejoin="bevel"></path></FooterSvg>
            <FooterDiv>
                <img src={WorldMap} alt='WorldMap' /> 
                <Wrapper>
                    <FooterLogo>
                        <img src={Logo} alt='logo'></img>
                        <p>
                        Countries App. It is a page where you can see the countries of the world and filter by continents or type of activity. 
                        And you can also create activity relating one or more countries.
                        </p>
                    </FooterLogo>
                    <FooterLink>
                        <h3>Useful links</h3>
                        <ul>
                            <li><Link to='/home'><img src={iconHome} alt='iconHome' />Home</Link></li>
                            <li><Link to='/activity'><img src={iconActivity} alt='iconActivity' />Activity</Link></li>
                        </ul>
                    </FooterLink>
                    <FooterContact>
                        <h3>Contact</h3>
                        <ul>
                            <li><img src={iconLocation} alt='iconLocation' />Argentina</li>
                            <li><img src={iconEmail} alt='iconEmail' />info@example.com</li>
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