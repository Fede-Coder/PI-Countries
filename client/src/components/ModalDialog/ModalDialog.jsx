import { ModalContent, ModalDiv, ModalForm, ModalInputRange, ModalInputText, ModalListCountries, ModalMain, ModalSelect, ModalSelectCountry, ModalTitle } from "./StyledModalDialog";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux"
import { deleteActivity, modifyActivity, showModal } from "../../redux/actions/CountryAction";
import React from "react";

export default function ModalDialog() {
    const dispatch = useDispatch();
    const selector = useSelector(state => state.country)
    return(
        <>
        {
            createPortal(
                <ModalMain showModal={selector.modal.show}>
                    <ModalDiv>
                        { selector.modal.type === 'delete' && <TypeDelete selector={selector} dispatch={dispatch} />}
                        { selector.modal.type === 'edit' && <TypeEdit selector={selector} dispatch={dispatch} />}
                    </ModalDiv>
                </ModalMain>
            , document.body)
        }
        </>
    )
}

export function TypeDelete({selector, dispatch}) {
    const activity = selector.activities.findLast(act => act.id === selector.modal.id)

    const handleOnClick = (event) => {
        const { value } = event.target
        if(value === 'cancel') dispatch(showModal('', ''))

        if(value === 'delete') {
            dispatch(showModal('', ''))
            dispatch(deleteActivity(activity.id))
            alert('Deleted activity')
        }
    }

    return(<>
        <ModalTitle>Delete activity</ModalTitle>
        <ModalContent>
            <p>Are you sure you want to delete activity <span>{activity.name}</span>?</p>
            <div>
                <button value={'cancel'} className="cancel" onClick={handleOnClick}>Cancel</button>
                <button value={'delete'} className="delete" onClick={handleOnClick}>Delete</button>
            </div>
        </ModalContent>
    </>)
}

export function TypeEdit({selector, dispatch}) {
    const activity = selector.activities.findLast(act => act.id === selector.modal.id)
    const countries = selector.allCountries
    const currentCountry = countries.filter(country => country.activities.some(act => act.name === activity.name))
    

    const [input, setInput] = React.useState({
        name: activity.name,
        difficulty: activity.difficulty,
        duration: activity.duration,
        season: activity.season,
        country: '',
        currentCountry: currentCountry,
        countryAdd: [],
        countryRemove: []
    })

    

    const isEqualInputOldNew = () => {
        const oldInput = {...activity, currentCountry: currentCountry, countryAdd: [], countryRemove: []};
        delete oldInput.id

        const newInput = {
            name: input.name,
            difficulty: Number(input.difficulty),
            duration: Number(input.duration),
            season: input.season,
            currentCountry: input.currentCountry,
            countryAdd: input.countryAdd,
            countryRemove: input.countryRemove
        }
        return JSON.stringify(oldInput) === JSON.stringify(newInput)
    }

    const [errors, setErrors] = React.useState({})

    const handleOnClick = (event) => {
        const { value } = event.target
        if(value === 'cancel') dispatch(showModal('', ''))
        if(value === 'update') {
            dispatch(modifyActivity(
                {
                    id: activity.id,
                    name: input.name,
                    difficulty: Number(input.difficulty),
                    duration: Number(input.duration),
                    season: input.season,
                    countryAdd: input.countryAdd.map(country => country.name),
                    countryRemove: input.countryRemove.map(country => country.name)
                }
            ))
            dispatch(showModal('', ''))
        }
    }

    const handleInput = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
    }

    const handleAddCountry = () => {
        const findCountryInDb = countries.find(country => country.name === input.country)

        const findCountryInCurrently = input.currentCountry.some(country => country.name === input.country)
        const findCountryInAdded = input.countryAdd.some(country => country.name === input.country)
        const findCountryInRemoved = input.countryRemove.some(country => country.name === input.country)

        if(findCountryInDb && !findCountryInCurrently && !findCountryInAdded && !findCountryInRemoved) {
            setInput({
                ...input,
                country: '',
                countryAdd: [...input.countryAdd ,findCountryInDb]
            })
        }
    }

    const handleRemoveCountry = (event) => {
        const id = event.currentTarget.value
        setInput({
            ...input,
            countryRemove: [...input.countryRemove, input.currentCountry.find(country => country.id === id)],
            currentCountry: input.currentCountry.filter(country => country.id !== id)
        })
    }

    const handleRemoveCountryFromCountryAdd = (event) => {
        const id = event.currentTarget.value
        setInput({
            ...input,
            countryAdd: input.countryAdd.filter(country => country.id !== id)
        })
    }

    const handleRecoveryCountryFromCountryRemove = (event) => {
        const id = event.currentTarget.value
        setInput({
            ...input,
            currentCountry: [...input.currentCountry, input.countryRemove.find(country => country.id === id)],
            countryRemove: input.countryRemove.filter(country => country.id !== id)
        })
    }

    React.useEffect(() => {        
        setErrors(validation({...input}))
    }, [input]);

    return(<>
        <ModalTitle>Editing activity</ModalTitle>
        <ModalContent isEqualInputOldNew={isEqualInputOldNew()}>
            <ModalForm >                
                <label>Name of the activity</label>
                <span>{errors.name}</span>
                <ModalInputText disabled={selector.isFetching} isError={errors.name} type={'text'} name={'name'} value={input.name} onChange={handleInput}/>
                <label>Difficulty</label>
                <span>{errors.difficulty}</span>
                <ModalInputRange disabled={selector.isFetching} type={'range'} name={'difficulty'} value={input.difficulty} min={'0'} max={'5'} onChange={handleInput}/>
                <label>Duration in hours</label>
                <span>{errors.duration}</span>
                <ModalInputText disabled={selector.isFetching} isError={errors.duration} type={'number'} name={'duration'} value={input.duration} min={'1'} max={'72'} onChange={handleInput} />
                <label>Season</label>
                <ModalSelect disabled={selector.isFetching} name={'season'} value={input.season} onChange={handleInput}>
                    <option>Summer</option>
                    <option>Fall</option>
                    <option>Winter</option>
                    <option>Spring</option>
                </ModalSelect>
                <label>Select country</label>
                <span>{errors.currentCountry}</span>
                <ModalSelectCountry disabled={selector.isFetching}>
                    <ModalInputText disabled={selector.isFetching} isError={errors.currentCountry} type={'text'} list={'countries'} name={'country'} value={input.country} onChange={handleInput}/>
                    <button type={'button'} onClick={handleAddCountry}>+</button>
                    <datalist id={'countries'}>
                        {
                            selector.allCountries && selector.allCountries.slice().sort((a,b) => a.name > b.name).map(country =>
                                <option key={country.id}>{country.name}</option>
                            )
                        }
                    </datalist>
                </ModalSelectCountry>
                {
                    input.currentCountry.length > 0
                    &&
                    <>
                        <label>Countries currently</label>
                        <ModalListCountries>
                            {
                                input.currentCountry.map((country, index) => <button type={'button'} key={index} value={country.id} onClick={handleRemoveCountry}><img src={country.image} alt={country.name} /></button>)
                            }
                        </ModalListCountries>
                    </>
                }
                {
                    input.countryAdd.length > 0
                    &&
                    <>
                        <label>Countries being added</label>
                        <ModalListCountries>
                            {
                                input.countryAdd.map((country, index) => <button type={'button'} key={index} value={country.id} onClick={handleRemoveCountryFromCountryAdd} ><img src={country.image} alt={country.name} /></button>)
                            }
                        </ModalListCountries>
                    </>
                }
                {
                    input.countryRemove.length > 0
                    &&
                    <>
                        <label>Countries being removed</label>
                        <ModalListCountries>
                            {
                                input.countryRemove.map((country, index) => <button type={'button'} key={index} value={country.id} onClick={handleRecoveryCountryFromCountryRemove}><img src={country.image} alt={country.name} /></button>)
                            }
                        </ModalListCountries>
                    </>
                }
            </ModalForm>
            <div>
                <button value={'cancel'} className="cancel" onClick={handleOnClick}>Cancel</button>
                <button disabled={isEqualInputOldNew()} value={'update'} className="update" onClick={handleOnClick}>Update</button>
            </div>
        </ModalContent>
    </>)
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

    if(inputs.currentCountry.length === 0 && inputs.countryAdd.length === 0) {
        errors.currentCountry = 'Must have at least one country selected'
    }

    return errors;
}