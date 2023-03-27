import { NotFoundMain } from './StyledNotFound';
import img404 from '../../assets/img/404.svg'
import { Wrapper } from '../../assets/css/styledGlobal';

export default function NotFound() {
    return(
        <Wrapper>            
            <NotFoundMain>
                <h1>Oh no! Page not found</h1>
                <img src={img404} alt={'Not found'} />
            </NotFoundMain>
        </Wrapper>
    )
}