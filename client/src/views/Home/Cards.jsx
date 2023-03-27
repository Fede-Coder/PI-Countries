import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchCountries, setCurrentPage, setFilterCountries, setSearch, setSortCountries } from '../../redux/actions/CountryAction';

//Card of country
import Card from './Card';

//Styles and images
import { Wrapper } from '../../assets/css/styledGlobal';
import { CardsBar, CardsBarDiv, CardsButtonPage, CardsDiv, CardsInput, CardsMain, CardsPagination, CardsSelect } from './StyledCards';
import Warning from '../../assets/icons/warning.svg'
import Loading from '../../components/Loading/Loading'

//Cards from all countries with search, filters and sort
export default function Cards() {
    
    //Page configuration, to set the number of countries per page
    const qtyPerPage = 10;

    const dispatch = useDispatch();
    const selector = useSelector(state => state.country);

    //Function to set the current page in global state
    const handleOnClickPage = (numberPage) => {
        dispatch(setCurrentPage(numberPage))
    }

    //Function to set the search typed by the user and set page 1 as current
    const handleSearchByName = (event) => {
        dispatch(searchCountries(event.target.value))
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
                    <CardsBarDiv>
                        <span>Search by country name</span>
                        <CardsInput placeholder={'Search...'} name={'search'} disabled={selector.isFetching} value={selector.search} onChange={handleSearchByName}/>
                    </CardsBarDiv>
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
                    <CardsBarDiv>
                        <span>Sort by name country or population</span>
                        <CardsSelect value={selector.sortBy} disabled={selector.isFetching} onChange={handleSortBy}>
                            <option value={''} disabled>Sort by...</option>
                            <option value={'Country'}>Country</option>
                            <option value={'Population'}>Population</option>
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
                    <CardsPagination>
                        <Pagination countries={selector.countries} qtyPerPage={qtyPerPage} currentPage={selector.currentPage} handleOnClickPage={handleOnClickPage} />
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
                        !selector.isFetching && selector.countries.length === 0 && <><img src={Warning} alt='warning' /><h1>There are no countries to show.</h1></>
                    }
                    {
                        !selector.isFetching && selector.countries.length > 0 && <CountriesPerPage countries={selector.countries} currentPage={selector.currentPage} qtyPerPage={qtyPerPage}/>
                    }
                </CardsDiv>
            </Wrapper>
        </CardsMain>
    )
}
//Quiero hacer paginación de [first_page ... n-2 n-1 n n+1 n+2 ... last_page]
//3 arreglos y 2 variables
//1º arreglo: left_pages = [n-m]
//2º arreglo: pages = [n-2, n-1, n, n+1, n+2]
//3º arreglo: right_pages = [n+m]
export function Pagination(props) {

    const genArrayNumbers = (max_number) => {
        let i = 1;
        const genArrayNumbers = []
        while (i <= max_number) {
            genArrayNumbers.push(i)
            i++;
        }
        return genArrayNumbers;
    }

    let totalPage = Math.ceil(props.countries.length / props.qtyPerPage);

    // let numberGenerated = genArrayNumbers(totalPage)

    // let left_pages = numberGenerated.slice(undefined,props.currentPage-3)
    // let mid_pages = numberGenerated.slice(props.currentPage-3,props.currentPage+2)
    // let right_pages = numberGenerated.slice(props.currentPage+2,undefined)

    // if(props.currentPage)

    // console.log("left_pages", left_pages);
    // console.log("mid_pages", mid_pages);
    // console.log("right_pages", right_pages);
    return(<>
        {
            genArrayNumbers(totalPage).map((numberPage, index) => 
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