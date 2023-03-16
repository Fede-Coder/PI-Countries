import { CardImg, CardMain } from './StyledCard';

export default function Card(props) {
    return(
        <CardMain to={`/detail/${props.id}`}>
            <CardImg>
                <img src={props.image} alt={props.name}></img>
            </CardImg>
            <p>Name: {props.name}</p>
            <p>Continent: {props.continent}</p>
        </CardMain>
    )
}