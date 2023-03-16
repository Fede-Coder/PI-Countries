import { Wrapper } from '../../assets/css/styledGlobal';
import { LandingH1, LandingMain } from './StyledLanding';
import Img from '../../assets/img/countries.png'

export default function Landing() {
    return(
        <Wrapper>
            <LandingMain>
                    <LandingH1>Welcome to the countries website!</LandingH1>
                    <img src={Img} alt='countries'></img>
            </LandingMain>
        </Wrapper>
    )
}