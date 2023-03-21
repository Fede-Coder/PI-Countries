import { ActivityButton, ActivityDiv, ActivityDivLeft, ActivityDivRight, ActivityForm, ActivityInputRange, ActivityInputText, ActivityMain, ActivitySelect, ActivitySelectCountry, ActivityTitle } from './StyledActivity';
import { Wrapper } from '../../assets/css/styledGlobal'
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

export default function Activity() {

    const [input, setInput] = React.useState({
        name: '',
        difficulty: 1,
        duration: 1,
        season: 'Summer',
        country: '',
    })
    const [countrySel, setCountrySel] = React.useState([]);

    const dispatch = useDispatch();
    const selector = useSelector(state => state.country)
    
    const handleOnSubmit = (event) => {
        event.preventDefault();
    }
    
    const handleInput = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    const handleAddCountry = () => {
        if(selector.nameCountries.some(country => country === input.country)) {
            setCountrySel([...countrySel, input.country])
            setInput({
                ...input,
                country: ''
            })
        }
    }

    return(
        <ActivityMain>
            <Wrapper>
                <ActivityDivLeft>
                    <ActivityTitle>Create activity</ActivityTitle>
                    <ActivityForm onSubmit={handleOnSubmit}>
                        <span>Name of the activity</span>
                        <ActivityInputText name={'name'} value={input.name} onChange={handleInput}/>
                        <span>Difficulty</span>
                        <ActivityInputRange type={'range'} name={'difficulty'} value={input.difficulty} min={'1'} max={'5'} onChange={handleInput}/>
                        <span>Duration in hours</span>
                        <ActivityInputText name={'duration'} value={input.duration} onChange={handleInput} />
                        <span>Season</span>
                        <ActivitySelect name={'season'} value={input.season} onChange={handleInput}>
                            <option>Summer</option>
                            <option>Fall</option>
                            <option>Winter</option>
                            <option>Spring</option>
                        </ActivitySelect>
                        <span>Select country</span>
                        <ActivitySelectCountry>
                            <ActivityInputText list={'countries'} name={'country'} value={input.country} onChange={handleInput}/>
                            <button onClick={handleAddCountry}>+</button>
                            <datalist id={'countries'}>
                                {
                                    selector.nameCountries && selector.nameCountries.map(country =>
                                        <option key={country}>{country}</option>
                                    )
                                }
                            </datalist>
                            <div>
                                {
                                    countrySel.map(country => country)
                                }
                            </div>
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