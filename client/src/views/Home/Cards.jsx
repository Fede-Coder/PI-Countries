import React from 'react';
import { CardsBar, CardsBarDiv, CardsButtonPage, CardsDiv, CardsInput, CardsMain, CardsPagination, CardsSelect } from './StyledCards';
import { Wrapper } from '../../assets/css/styledGlobal';
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { searchCountries, setCurrentPage } from '../../redux/actions/CountryAction';

export default function Cards() {
    
    const qtyPerPage = 10;

    const dispatch = useDispatch();
    const selector = useSelector(state => state.country);

    const handleSearchByName = (event) => {
        dispatch(searchCountries(event.target.value))
        dispatch(setCurrentPage(1))
    }

    const handleOnClickPage = (numberPage) => {
        dispatch(setCurrentPage(numberPage))
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
                        <CardsSelect>
                            <option value={''} disabled>Continent</option>
                            <option value={'All'}>All</option>
                            <option value={'Americas'}>Americas</option>
                            <option value={'Europe'}>Europe</option>
                            <option value={'Africa'}>Africa</option>
                            <option value={'Asia'}>Asia</option>
                            <option value={'Oceania'}>Oceania</option>
                            <option value={'Antarctic'}>Antarctic</option>
                        </CardsSelect>
                        <CardsSelect>
                            <option value={''} disabled>Activities</option>
                            { selector.activities && selector.activities.map(option =>
                                <option key={option.name} value={option.name}>{option.name}</option>
                            )}
                        </CardsSelect>
                    </CardsBarDiv>
                    <CardsBarDiv>
                        <span>Sort by countries or population</span>
                        <CardsSelect>
                            <option value={''} disabled>Sort by...</option>
                            <option value={'Countries'}>Countries</option>
                            <option value={'Population'}>Population</option>
                        </CardsSelect>
                        <CardsSelect >
                            <option value={''} disabled>In shape...</option>
                            <option value={'Ascending'}>Ascending</option>
                            <option value={'Descending'}>Descending</option>
                        </CardsSelect>
                    </CardsBarDiv>
                </CardsBar>
                <CardsPagination>
                    {
                        selector.countries && <Pagination countries={selector.countries} qtyPerPage={qtyPerPage} handleOnClickPage={handleOnClickPage} />
                    }
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
                <CardsButtonPage key={index} onClick={() => props.handleOnClickPage(numberPage)}>{numberPage}</CardsButtonPage>
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