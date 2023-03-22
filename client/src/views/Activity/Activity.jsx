import { ActivityButton, ActivityDiv, ActivityDivLeft, ActivityDivRight, ActivityForm, ActivityInputRange, ActivityInputText, ActivityMain, ActivitySelect, ActivitySelectCountry, ActivityTitle } from './StyledActivity';
import { Wrapper } from '../../assets/css/styledGlobal'
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';

//Falta terminar validación!!!!!!!!!!!!!!!!!!
export default function Activity() {

    const dispatch = useDispatch();
    const selector = useSelector(state => state.country)

    const [input, setInput] = React.useState({
        name: '',
        difficulty: 1,
        duration: 1,
        season: 'Summer',
        country: '',
        countrySelected: [],
    })

    const [errors, setErrors] = React.useState({})

    const handleOnSubmit = (event) => {
        event.preventDefault();
        console.log('publicando');
    }
    
    const handleInput = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
        setErrors(validation({
            ...input,
            [event.target.name]: event.target.value
        }))
    }

    const handleAddCountry = () => {
        const findCountry = selector.allCountries.find(country => country.name === input.country)
        if(findCountry) {
            setInput({
                ...input,
                country: '',
                countrySelected: [...input.countrySelected ,findCountry]
            })
        }
    }

    const handleRemoveCountry = (event) => {
        setInput({
            ...input,
            countrySelected: input.countrySelected.filter(country => country.id !== event.currentTarget.value)
        })
    }

    return(
        <ActivityMain>
            <Wrapper>
                <ActivityDivLeft>
                    <ActivityTitle>Create activity</ActivityTitle>
                    <ActivityForm onSubmit={handleOnSubmit}>
                        <label>Name of the activity</label>
                        <ActivityInputText type={'text'} name={'name'} value={input.name} onChange={handleInput}/>
                        <label>Difficulty</label>
                        <ActivityInputRange type={'range'} name={'difficulty'} value={input.difficulty} min={'0'} max={'5'} onChange={handleInput}/>
                        <label>Duration in hours</label>
                        <ActivityInputText type={'number'} name={'duration'} value={input.duration} onChange={handleInput} />
                        <label>Season</label>
                        <ActivitySelect name={'season'} value={input.season} onChange={handleInput}>
                            <option>Summer</option>
                            <option>Fall</option>
                            <option>Winter</option>
                            <option>Spring</option>
                        </ActivitySelect>
                        <label>Select country</label>
                        <ActivitySelectCountry>
                            <ActivityInputText type={'text'} list={'countries'} name={'country'} value={input.country} onChange={handleInput}/>
                            <button type={'button'} onClick={handleAddCountry}>+</button>
                            <datalist id={'countries'}>
                                {
                                    selector.allCountries && selector.allCountries.map(country =>
                                        <option key={country.id}>{country.name}</option>
                                    )
                                }
                            </datalist>                            
                            {
                                input.countrySelected.length > 0
                                ?
                                <>
                                <label>Click a country to remove it</label>
                                <div>
                                    {
                                        input.countrySelected.length > 0 && input.countrySelected.map((country, index) => <button type={'button'} key={index} value={country.id} onClick={handleRemoveCountry}><img src={country.image} alt={country.name} /></button>)
                                    }
                                </div>
                                </>
                                :
                                ''
                            }
                        </ActivitySelectCountry>
                        <ActivityButton type={'submit'}>Create activity</ActivityButton>
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

export function validation(inputs) {
    let errors = {}

    return errors;

}