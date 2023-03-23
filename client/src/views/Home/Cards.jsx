import React from 'react';
import { CardsBar, CardsBarDiv, CardsButtonPage, CardsDiv, CardsInput, CardsMain, CardsPagination, CardsSelect } from './StyledCards';
import { Wrapper } from '../../assets/css/styledGlobal';
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { searchCountries, setCurrentPage, setFilterCountries, setSearch, setSortCountries } from '../../redux/actions/CountryAction';

export default function Cards() {
    
    const qtyPerPage = 10;

    const dispatch = useDispatch();
    const selector = useSelector(state => state.country);

    const handleOnClickPage = (numberPage) => {
        dispatch(setCurrentPage(numberPage))
    }

    const handleSearchByName = (event) => {
        dispatch(searchCountries(event.target.value))
        dispatch(setCurrentPage(1))
    }

    const handleFilterBy = (event) => {
        dispatch(setFilterCountries(event.target.value, undefined))
        dispatch(setCurrentPage(1))
        dispatch(setSearch(''))
    }

    const handleFilterOf = (event) => {        
        dispatch(setFilterCountries(undefined, event.target.value))
        dispatch(setCurrentPage(1))
        dispatch(setSearch(''))
    }

    const handleSortBy = (event) => {
        dispatch(setSortCountries(event.target.value, undefined))
    }

    const handleSortOf = (event) => {
        dispatch(setSortCountries(undefined, event.target.value))
    }

    return(
        <CardsMain>
            <Wrapper>
                <CardsBar>
                    <CardsBarDiv>
                        <span>Search by country name</span>
                        <CardsInput placeholder={'Search...'} name={'search'} value={selector.search} onChange={handleSearchByName}/>
                    </CardsBarDiv>
                    <CardsBarDiv>
                        <span>Filter by continent or type of activity</span>
                        <CardsSelect value={selector.filterBy} onChange={handleFilterBy}>
                            <option value={''} disabled>Filter by...</option>
                            <option value={'Continent'}>Continent</option>
                            <option value={'Activity'} disabled={selector.activities.length===0}>Activity</option>
                        </CardsSelect>
                        <CardsSelect value={selector.filterOf} onChange={handleFilterOf}>
                            <option value={''} disabled>Of...</option>
                            {
                                (selector.filterBy === 'Continent' && selector.continents.map(option =>
                                    <option key={option} value={option} >{option}</option>
                                ))
                                ||
                                (selector.filterBy === 'Activity' && selector.activities.map(option =>
                                    <option key={option.name} value={option.name} >{option.name}</option>
                                ))
                            }
                        </CardsSelect>
                    </CardsBarDiv>
                    <CardsBarDiv>
                        <span>Sort by name country or population</span>
                        <CardsSelect value={selector.sortBy} onChange={handleSortBy}>
                            <option value={''} disabled>Sort by...</option>
                            <option value={'Country'}>Country</option>
                            <option value={'Population'}>Population</option>
                        </CardsSelect>
                        <CardsSelect value={selector.sortOf} onChange={handleSortOf}>
                            <option value={''} disabled>Of...</option>
                            <option value={'Ascending'}>Ascending</option>
                            <option value={'Descending'}>Descending</option>
                        </CardsSelect>
                    </CardsBarDiv>
                </CardsBar>
                <CardsPagination>
                    <Pagination countries={selector.countries} qtyPerPage={qtyPerPage} currentPage={selector.currentPage} handleOnClickPage={handleOnClickPage} />
                </CardsPagination>
            </Wrapper>
            <Wrapper>
                <CardsDiv>
                    <CountriesPerPage countries={selector.countries} currentPage={selector.currentPage} qtyPerPage={qtyPerPage}/>
                </CardsDiv>
            </Wrapper>
        </CardsMain>
    )
}

export function Pagination(props) {

    const range = (from, to, step = 1) => {
        let i = from;
        const range = []
        while (i <= to) {
            range.push(i);
            i += step;
        }
        return range;
    }

    let totalPage = Math.ceil(props.countries.length / props.qtyPerPage);
    return(<>
        {
            range(1, totalPage).map((numberPage, index) => 
                <CardsButtonPage key={index} onClick={() => props.handleOnClickPage(numberPage)} className={props.currentPage-1 === index ? 'active' : null}>{numberPage}</CardsButtonPage>
            )
        }
    </>)
}

export function CountriesPerPage(props) {
    const start = props.currentPage*props.qtyPerPage-props.qtyPerPage;
    const end = props.currentPage*props.qtyPerPage;
    return(<>
        {
            props.countries && props.countries.slice(start, end).map((country, index) => 
                <Card key={index} id={country.id} name={country.name} continent={country.continent} image={country.image} />
            )
        }
    </>)
}