import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchCountries, setCurrentPage, setFilterCountries, setSearch, setSortCountries } from '../../redux/actions/CountryAction';

//Card of country
import Card from './Card';

//Styles and images
import { Wrapper } from '../../assets/css/styledGlobal';
import { CardsBar, CardsBarDiv, CardsButton, CardsButtonPage, CardsButtonPrevNext, CardsDiv, CardsInput, CardsMain, CardsPagination, CardsSelect } from './StyledCards';
import Warning from '../../assets/icons/warning.svg'
import Loading from '../../components/Loading/Loading'

//Cards from all countries with search, filters and sort
export default function Cards() {

    const dispatch = useDispatch();
    const selector = useSelector(state => state.country);
    
    //methodPage = 1 - Method 1: simple pagination
    //methodPage = 2 - Method 2: advanced pagination
    const methodPage = 2;

    //Page configuration, to set the number of countries per page
    const qtyPerPage = 10;

    //The total number of pages is calculated by dividing the total number of countries by the number of countries per page.
    let totalPage = Math.ceil(selector.countries.length / qtyPerPage);

    const inputRefSearchBar = React.useRef(null)

    //Function to set the current page in global state
    const handleOnClickPage = (numberPage) => {
        if(numberPage === '...') return
        if(numberPage <= 0 || numberPage > totalPage) return;
        dispatch(setCurrentPage(numberPage))
    }

    //Function to set the search typed by the user and set page 1 as current
    const handleSearchByName = () => {
        dispatch(searchCountries(inputRefSearchBar.current.value))
        dispatch(setCurrentPage(1))
    }

    //Function to set the filter by ... without filter of ...
    //Set page 1 as current and set search empty
    const handleFilterBy = (event) => {
        dispatch(setFilterCountries(event.target.value, undefined))
        dispatch(setCurrentPage(1))
        dispatch(setSearch(''))
    }

    //Function to set the filter of ... without filter by ...
    //Set page 1 as current and set search empty
    const handleFilterOf = (event) => {        
        dispatch(setFilterCountries(undefined, event.target.value))
        dispatch(setCurrentPage(1))
        dispatch(setSearch(''))
    }

    //Function to set the sort by ... without sort of ...
    const handleSortBy = (event) => {
        dispatch(setSortCountries(event.target.value, undefined))
    }

    //Function to set the sort of ... without sort by ...
    const handleSortOf = (event) => {
        dispatch(setSortCountries(undefined, event.target.value))
    }

    return(
        <CardsMain>
            <Wrapper>
                {/*

                Inside the bar there is search, filter and sort

                */}
                <CardsBar>
                    {/* Search by country name */}
                    <CardsBarDiv>
                        <span>Search by country name</span>
                        <CardsInput placeholder={'Search...'} name={'search'} disabled={selector.isFetching} ref={inputRefSearchBar}/>
                        <CardsButton onClick={handleSearchByName}>🔎</CardsButton>
                    </CardsBarDiv>
                    {/* Filter by continent or type of activity */}
                    <CardsBarDiv>
                        <span>Filter by continent or type of activity</span>
                        <CardsSelect value={selector.filterBy} disabled={selector.isFetching} onChange={handleFilterBy}>
                            <option value={''} disabled>Filter by...</option>
                            <option value={'Continent'}>Continent</option>
                            {
                                selector.activities.length!==0 && <option value={'Activity'}>Activity</option>
                            }                            
                        </CardsSelect>
                        <CardsSelect value={selector.filterOf} disabled={selector.isFetching} onChange={handleFilterOf}>
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
                    {/* Sort by name country or population */}
                    <CardsBarDiv>
                        <span>Sort by name country or population</span>
                        <CardsSelect value={selector.sortBy} disabled={selector.isFetching} onChange={handleSortBy}>
                            <option value={''} disabled>Sort by...</option>
                            <option value={'Country'}>Country</option>
                            <option value={'Population'}>Population</option>
                            <option value={'Population density'}>Pop. density</option>
                        </CardsSelect>
                        <CardsSelect value={selector.sortOf} disabled={selector.isFetching} onChange={handleSortOf}>
                            <option value={''} disabled>Of...</option>
                            <option value={'Ascending'}>Ascending</option>
                            <option value={'Descending'}>Descending</option>
                        </CardsSelect>
                    </CardsBarDiv>
                </CardsBar>
                {/* 
                
                Pagination bar

                */}
                { selector.countries.length > qtyPerPage && !selector.isFetching &&
                    <CardsPagination methodPage={methodPage}>
                        <Pagination methodPage={methodPage} totalPage={totalPage} currentPage={selector.currentPage} handleOnClickPage={handleOnClickPage} />
                    </CardsPagination>
                }
            </Wrapper>
            <Wrapper>
                {/* 
                
                Countries per page

                */}
                <CardsDiv countries={selector.countries.length} isFetching={selector.isFetching}>
                    {
                        selector.isFetching && <Loading isFetching={selector.isFetching} size={'100px'} />
                    }
                    {
                        !selector.isFetching && selector.countries.length === 0 && <><img src={Warning} alt='Warning' /><h1>There are no countries to show.</h1></>
                    }
                    {
                        !selector.isFetching && selector.countries.length > 0 && <CountriesPerPage countries={selector.countries} currentPage={selector.currentPage} qtyPerPage={qtyPerPage}/>
                    }
                </CardsDiv>
            </Wrapper>
        </CardsMain>
    )
}

export function Pagination(props) {

    //Generator an array with numbers passing by parameter the maximum number that you want to generate
    //Example genArrayNumbers(5). Result= [1, 2, 3, 4, 5]
    const genArrayNumbers = (max_number) => {
        let i = 1;
        const genArrayNumbers = []
        while (i <= max_number) {
            genArrayNumbers.push(i)
            i++;
        }
        return genArrayNumbers;
    }

    //An array of numbers with the maximum number of pages is generated.
    let numberGenerated = genArrayNumbers(props.totalPage)

    //Pagination algorithm
    //Number of neighboring pages. Example: [ n-2, n-1, n, n+1, n+2 ]
    let numNeighbors = 2;
    let arrayPages;
    if(props.methodPage === 1) {
        arrayPages = numberGenerated;
    } else if (props.methodPage === 2) {
        if(props.totalPage <= 10) {
            arrayPages = numberGenerated
        } else {
            if(numNeighbors+2 >= props.currentPage) {
                arrayPages = [...numberGenerated.slice(undefined,props.currentPage+numNeighbors), '...', props.totalPage]
            } else if(props.currentPage > props.totalPage-(numNeighbors+2)) {
                arrayPages = [1, '...', ...numberGenerated.slice(props.currentPage-numNeighbors-1, undefined)]

            } else {
                arrayPages = [1,'...',...numberGenerated.slice(props.currentPage-numNeighbors-1,props.currentPage+numNeighbors), '...', props.totalPage]
            }
        }
    }

    return(<>
        <div>
            <CardsButtonPrevNext disableButton={props.currentPage-1 <= 0} onClick={() => props.handleOnClickPage(props.currentPage-1)}>Prev</CardsButtonPrevNext>
        </div>
        <div className='mid'>
            {
                arrayPages.map((numberPage, index) => 
                    <CardsButtonPage key={index} onClick={() => props.handleOnClickPage(numberPage)} className={props.currentPage === numberPage ? 'active' : null}>{numberPage}</CardsButtonPage>
                )
            }
        </div>
        <div>
            <CardsButtonPrevNext disableButton={props.currentPage+1 > props.totalPage} onClick={() => props.handleOnClickPage(props.currentPage+1)}>Next</CardsButtonPrevNext>
        </div>
    </>)
}

export function CountriesPerPage(props) {
    //The start and end variables are for generating with Array.prototype.slice()
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