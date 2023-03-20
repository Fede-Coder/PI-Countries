import { ActivityButton, ActivityDiv, ActivityDivLeft, ActivityDivRight, ActivityForm, ActivityInputRange, ActivityInputText, ActivityMain, ActivitySelect, ActivitySelectCountry, ActivityTitle } from './StyledActivity';
import { Wrapper } from '../../assets/css/styledGlobal'
import { useDispatch, useSelector } from 'react-redux';

export default function Activity() {

    const dispatch = useDispatch();
    const selector = useSelector(state => state.country)

    

    return(
        <ActivityMain>
            <Wrapper>
                <ActivityDivLeft>
                    <ActivityTitle>Create activity</ActivityTitle>
                    <ActivityForm>
                        <span>Name of the activity</span>
                        <ActivityInputText />
                        <span>Difficulty</span>
                        <ActivityInputRange type={'range'} defaultValue={'1'} min={'1'} max={'5'}/>
                        <span>Duration in hours</span>
                        <ActivityInputText />
                        <span>Season</span>
                        <ActivitySelect>
                            <option>Summer</option>
                            <option>Fall</option>
                            <option>Winter</option>
                            <option>Spring</option>
                        </ActivitySelect>
                        <span>Select country</span>
                        <ActivitySelectCountry>
                            <ActivityInputText list={'countries'} />
                            <button>+</button>
                            <datalist id={'countries'}>
                                <option>Argentina</option>
                                <option>Peru</option>
                            </datalist>
                        </ActivitySelectCountry>
                        <ActivityButton>Create activity</ActivityButton>
                    </ActivityForm>
                </ActivityDivLeft>
                <ActivityDivRight>
                    <ActivityTitle>Activities list</ActivityTitle>
                    <ActivityDiv>
                    </ActivityDiv>
                </ActivityDivRight>
            </Wrapper>
        </ActivityMain>
    )
}