import { ActivitiesButton, ActivitiesButtonDiv, ActivityButton, ActivityDiv, ActivityDivLeft, ActivityDivRight, ActivityForm, ActivityInputRange, ActivityInputText, ActivityMain, ActivitySelect, ActivitySelectCountry, ActivityTitle } from './StyledActivity';
import { Wrapper } from '../../assets/css/styledGlobal'
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { createActivity, setCurrentPage, setFilterCountries, setSearch, showModal } from '../../redux/actions/CountryAction';
import {useNavigate} from 'react-router-dom'
import Loading from '../../components/Loading/Loading'

import Summer from '../../assets/icons/summer.svg';
import Fall from '../../assets/icons/fall.svg';
import Winter from '../../assets/icons/winter.svg';
import Spring from '../../assets/icons/spring.svg';
import Warning from '../../assets/icons/warning.svg'
import Edit from '../../assets/icons/edit.svg'
import Trash from '../../assets/icons/trash.svg'

export default function Activity() {

    const dispatch = useDispatch();
    const selector = useSelector(state => state.country)
    const navigate = useNavigate()

    const [input, setInput] = React.useState({
        name: '',
        difficulty: 1,
        duration: 1,
        season: 'Summer',
        country: '',
        countrySelected: [],
    })
    
    const [editMode, setEditMode] = React.useState(false)

    const [errors, setErrors] = React.useState({})

    const handleOnSubmit = (event) => {
        event.preventDefault();
        if(Object.keys(errors).length > 0) {
            alert('Please complete the necessary fields')
        } else {
            alert('Activity created')
            const activity = {
                name: input.name,
                difficulty: input.difficulty,
                duration: input.duration,
                season: input.season,
                country: input.countrySelected.map(country => country.name)
            }
            dispatch(createActivity(activity))
            
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
        const findCountryInDb = selector.allCountries.find(country => country.name === input.country)
        const findCountryInSelected = input.countrySelected.some(country => country.name === input.country)
        if(findCountryInDb && !findCountryInSelected) {
            setInput({
                ...input,
                country: '',
                countrySelected: [...input.countrySelected ,findCountryInDb]
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
        dispatch(setCurrentPage(1))
        navigate('/home')
    }

    React.useEffect(() => {
        setErrors(validation({...input}))
    }, [input]);

    const getIconSeason = (name) => {
        switch(name){
            case 'Summer': {
                return <img src={Summer} alt={name}/>;
            }
            case 'Fall': {
                return <img src={Fall} alt={name}/>;
            }
            case 'Winter': {
                return <img src={Winter} alt={name}/>;
            }
            case 'Spring': {
                return <img src={Spring} alt={name}/>;
            }
            default: {
                return '';
            }
        }
    }

    const handleOpenModal = (id, type) => {
        // dispatch(deleteActivity(act.id))
        dispatch(showModal(id, type))
    }

    return(
        <ActivityMain>
            <Wrapper>
                <ActivityDivLeft>
                    <ActivityTitle><h1>Create activity</h1></ActivityTitle>
                    <ActivityForm onSubmit={handleOnSubmit}>
                        <label>Name of the activity</label>
                        <span>{errors.name}</span>
                        <ActivityInputText disabled={selector.isFetching} isError={errors.name} type={'text'} name={'name'} value={input.name} onChange={handleInput}/>
                        <label>Difficulty</label>
                        <span>{errors.difficulty}</span>
                        <ActivityInputRange disabled={selector.isFetching} type={'range'} name={'difficulty'} value={input.difficulty} min={'0'} max={'5'} onChange={handleInput}/>
                        {/* {input.difficulty} */}
                        <label>Duration in hours</label>
                        <span>{errors.duration}</span>
                        <ActivityInputText disabled={selector.isFetching} isError={errors.duration} type={'number'} name={'duration'} value={input.duration} min={'1'} max={'72'} onChange={handleInput} />
                        <label>Season</label>
                        <ActivitySelect disabled={selector.isFetching} name={'season'} value={input.season} onChange={handleInput}>
                            <option>Summer</option>
                            <option>Fall</option>
                            <option>Winter</option>
                            <option>Spring</option>
                        </ActivitySelect>
                        <label>Select country</label>
                        <span>{errors.countrySelected}</span>
                        <ActivitySelectCountry disabled={selector.isFetching}>
                            <ActivityInputText disabled={selector.isFetching} isError={errors.countrySelected} type={'text'} list={'countries'} name={'country'} value={input.country} onChange={handleInput}/>
                            <button type={'button'} onClick={handleAddCountry}>+</button>
                            <datalist id={'countries'}>
                                {
                                    selector.allCountries && selector.allCountries.slice().sort((a,b) => a.name > b.name).map(country =>
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
                        <ActivityButton disabled={selector.isFetching}  type={'submit'}><Loading isFetching={selector.isFetching} />Create activity</ActivityButton>
                    </ActivityForm>
                </ActivityDivLeft>
                <ActivityDivRight>
                    <ActivityTitle editMode={editMode} ><h1>Activities list</h1> <button disabled={selector.isFetching} type={'button'} onClick={() => setEditMode(!editMode)} ><img src={Edit} alt={'Edit'} /> Edit mode</button> </ActivityTitle>
                    <ActivityDiv editMode={editMode} activities={selector.activities.length}>
                        
                        { selector.activities.length !== 0
                        ?
                            <>
                                <div>
                                    <h3>Name</h3>
                                    <h3>Difficulty</h3>
                                    <h3>Duration</h3>
                                    <h3>Season</h3>
                                    { editMode && <h3>Action</h3> }
                                </div>
                                {
                                    selector.activities.map((act, index) =>
                                    <ActivitiesButton editMode={editMode}  key={index} onClick={() => editMode ? undefined : handleOnClickActivity(act.name)}>
                                        <ActivitiesButtonDiv>{act.name}</ActivitiesButtonDiv>
                                        <ActivitiesButtonDiv isBar valueDiff={act.difficulty}><span>{act.difficulty*20}%</span><div></div></ActivitiesButtonDiv>
                                        <ActivitiesButtonDiv>{act.duration} hrs.</ActivitiesButtonDiv>
                                        <ActivitiesButtonDiv>{getIconSeason(act.season)}<div>{act.season}</div></ActivitiesButtonDiv>
                                        {
                                            editMode && 
                                            <ActivitiesButtonDiv>
                                                <button type={'button'} onClick={() => handleOpenModal(act.id, 'edit')}><img src={Edit} alt={'Edit'} /></button>
                                                <button type={'button'} onClick={() => handleOpenModal(act.id, 'delete')}><img src={Trash} alt={'Trash'} /></button>
                                            </ActivitiesButtonDiv>
                                        }
                                    </ActivitiesButton>
                                )
                                }
                            </>
                        :
                        <><img src={Warning} alt='warning' /><h1>There are no activities to show. Start creating the activities</h1></>
                        }
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