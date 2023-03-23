import { ActivityButton, ActivityDiv, ActivityDivLeft, ActivityDivRight, ActivityForm, ActivityInputRange, ActivityInputText, ActivityMain, ActivitySelect, ActivitySelectCountry, ActivityTitle } from './StyledActivity';
import { Wrapper } from '../../assets/css/styledGlobal'
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { createActivity, getAllActivities, getAllCountries, setFilterCountries, setSearch } from '../../redux/actions/CountryAction';
import {Link} from 'react-router-dom'

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
        if(Object.keys(errors).length > 0) {
            alert('no podemos hacer post porque tiene errores')
        } else {
            alert('hecho')
            const activity = {
                name: input.name,
                difficulty: input.difficulty,
                duration: input.duration,
                season: input.season,
                country: input.countrySelected.map(country => country.name)
            }
            dispatch(createActivity(activity)).then(res => {
                dispatch(getAllCountries())
                dispatch(getAllActivities())
            })
            
            setInput({
                name: '',
                difficulty: 1,
                duration: 1,
                season: 'Summer',
                country: '',
                countrySelected: [],
            })
        }
    }
    
    const handleInput = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
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

    const handleOnClickActivity = (name) => {
        dispatch(setFilterCountries('Activity', name))
        dispatch(setSearch(''))
    } 

    React.useEffect(() => {
        setErrors(validation({...input}))
    }, [input]);

    return(
        <ActivityMain>
            <Wrapper>
                <ActivityDivLeft>
                    <ActivityTitle>Create activity</ActivityTitle>
                    <ActivityForm onSubmit={handleOnSubmit}>
                        <label>Name of the activity</label>
                        <span>{errors.name}</span>
                        <ActivityInputText isError={errors.name} type={'text'} name={'name'} value={input.name} onChange={handleInput}/>
                        <label>Difficulty</label>
                        <span>{errors.difficulty}</span>
                        <ActivityInputRange type={'range'} name={'difficulty'} value={input.difficulty} min={'0'} max={'5'} onChange={handleInput}/>
                        <label>Duration in hours</label>
                        <span>{errors.duration}</span>
                        <ActivityInputText isError={errors.duration} type={'number'} name={'duration'} value={input.duration} min={'1'} max={'72'} onChange={handleInput} />
                        <label>Season</label>
                        <ActivitySelect name={'season'} value={input.season} onChange={handleInput}>
                            <option>Summer</option>
                            <option>Fall</option>
                            <option>Winter</option>
                            <option>Spring</option>
                        </ActivitySelect>
                        <label>Select country</label>
                        <span>{errors.countrySelected}</span>
                        <ActivitySelectCountry>
                            <ActivityInputText isError={errors.countrySelected} type={'text'} list={'countries'} name={'country'} value={input.country} onChange={handleInput}/>
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
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Difficulty</th>
                                    <th>Duration</th>                                
                                    <th>Season</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selector.activities && selector.activities.map((act, index) => 
                                <tr key={index}>
                                    <td><Link to='/home' onClick={() => handleOnClickActivity(act.name)}>{act.name}</Link></td>
                                    <td>{act.difficulty}</td>
                                    <td>{act.duration}</td>
                                    <td>{act.season}</td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                    </ActivityDiv>
                </ActivityDivRight>
            </Wrapper>
        </ActivityMain>
    )
}

export function validation(inputs) {
    let errors = {}

    if(inputs.name.trim().length === 0) {
        errors.name = 'Activity name is required'
    } else {
        if(inputs.name.length > 25) {
            errors.name = 'Activity name must be less than 25 characters'
        }
    }

    if(!inputs.difficulty.length === 0) {
        errors.difficulty = 'Difficulty is required'
    } else {
        if(isNaN(inputs.difficulty)) {
            errors.difficulty = 'Difficulty must supports only numbers'
        } else if(Number(inputs.difficulty) < 1 || Number(inputs.difficulty) > 5) {
            errors.difficulty = 'Difficulty must be between 1 and 5'
        }
    }

    if(!inputs.duration.length === 0) {
        errors.duration = 'Duration is required'
    } else {
        if(isNaN(inputs.duration)) {
            errors.duration = 'Duration must supports only numbers'
        } else if(Number(inputs.duration) < 1 || Number(inputs.duration) > 72) {
            errors.duration = 'Duration must be between 1 hour and 72 hours'
        }
    }

    if(inputs.countrySelected.length === 0) {
        errors.countrySelected = 'Must have at least one country selected'
    }

    return errors;
}