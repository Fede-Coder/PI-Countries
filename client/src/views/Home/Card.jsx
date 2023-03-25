import { CardContinent, CardImg, CardMain } from './StyledCard';
import Americas from '../../assets/icons/continents/americas-min.png'
import Europe from '../../assets/icons/continents/europa-min.png'
import Africa from '../../assets/icons/continents/africa-min.png'
import Oceania from '../../assets/icons/continents/oceania-min.png'
import Asia from '../../assets/icons/continents/asia-min.png'
import Antarctic from '../../assets/icons/continents/antartida-min.png'

export default function Card(props) {

    const getContinent = (name) => {
        switch (name) {
            case 'Americas':                
                return <img src={Americas} alt={name} />
            case 'Europe':                
                return <img src={Europe} alt={name} />
            case 'Africa':                
                return <img src={Africa} alt={name} />
            case 'Oceania':                
                return <img src={Oceania} alt={name} />
            case 'Asia':                
                return <img src={Asia} alt={name} />
            case 'Antarctic':                
                return <img src={Antarctic} alt={name} />        
            default:
                return '';
        }
    }

    return(
        <CardMain to={`/detail/${props.id}`}>
            <h2>{props.name}</h2>
            <CardImg>
                <img src={props.image} alt={props.name}></img>
            </CardImg>
            <CardContinent>                
                {getContinent(props.continent)}
                <h3>{props.continent}</h3>
            </CardContinent>
        </CardMain>
    )
}