import React from 'react';
import { connect } from 'react-redux';
import { CardsBar, CardsBarDiv, CardsButtonPage, CardsDiv, CardsInput, CardsMain, CardsPagination, CardsSelect } from './StyledCards';
import { Wrapper } from '../../assets/css/styledGlobal';
import { filterCountriesByContinent, getAllCountries, getCountriesPerPage, orderCountriesByName, orderCountriesByPopulation, searchCountries } from '../../redux/actions/CountryAction';
import Card from './Card';

export function Cards(props) {
    //Destructuring props
    const { getAllCountries, getCountriesPerPage, searchCountries, filterCountriesByContinent, orderCountriesByName, orderCountriesByPopulation, allCountries, countries } = props;

    //State for buttons page
    const [isActive, setIsActive] = React.useState(-1);

    //State of options
    const options = {
        continent: [
            {value: '', text: 'Continent'},
            {value: 'All', text: 'All'},
            {value: 'Americas', text: 'Americas'},
            {value: 'Europe', text: 'Europe'},
            {value: 'Africa', text: 'Africa'},
            {value: 'Asia', text: 'Asia'},
            {value: 'Oceania', text: 'Oceania'},
            {value: 'Antarctic', text: 'Antarctic'},
        ],
        countries: [
            {value: '', text: 'Countries'},
            {value: 'Ascending', text: 'Ascending'},
            {value: 'Descending', text: 'Descending'},
        ],
        population: [
            {value: '', text: 'Population'},
            {value: 'Ascending', text: 'Ascending'},
            {value: 'Descending', text: 'Descending'},
        ]
    }
    const [selected, setSelected] = React.useState({
        continent: options.continent[0].value,
        countries: options.countries[0].value,
        population: options.population[0].value
    })
    console.log(selected);

    const handleOnChangeFilterContinent = (event) => {
        setSelected({
            ...selected,
            continent: event.target.value,
            countries: '',
            population: ''
        })
        if(event.target.value === 'All') {
            getAllCountries(pageLimit)
            setIsActive(0)
        }
        else {
            filterCountriesByContinent(event.target.value, pageLimit)
            setIsActive(0)
        }
    }

    const handleOnChangeOrderCountriesByName = (event) => {
        setSelected({
            ...selected,
            countries: event.target.value,
            population: ''
        })
        orderCountriesByName(event.target.value, pageLimit)
        setIsActive(0)
    }

    const handleOnChangeOrderCountriesByPopulation = (event) => {
        setSelected({
            ...selected,
            population: event.target.value,
            countries: ''
        })
        orderCountriesByPopulation(event.target.value, pageLimit)
        setIsActive(0)
    }

    //Configuration for pagination
    let pageLimit = 10;
    let totalPage = undefined;

    React.useEffect(() => {
        getAllCountries(pageLimit)
        setIsActive(0)
    }, [getAllCountries, pageLimit]);

    //Get array with range
    const range = (from, to, step = 1) => {
        let i = from;
        const range = []
        while (i <= to) {
            range.push(i);
            i += step;
        }
        return range;
    }

    const handleOnClickPage = (limit, index) => {
        getCountriesPerPage(limit*pageLimit-pageLimit, limit*pageLimit)
        setIsActive(index)
    }
    
    //Render buttons for pagination
    const ButtonPagination = (array) => {
        totalPage = Math.ceil(array.length / pageLimit)
        return range(1, totalPage).map( (numberPage, index) => 
           <CardsButtonPage key={numberPage} onClick={() => handleOnClickPage(numberPage, index)} className={isActive === index ? "active" : null} >{numberPage}</CardsButtonPage>
        )
    }


    const handleOnChange = (event) => {
        searchCountries(event.target.value, pageLimit)
        setIsActive(0)
    }

    return(
        <CardsMain>
            <Wrapper>
                <CardsBar>
                    <CardsBarDiv>
                        <span>Search by country name</span>
                        <CardsInput placeholder={'Search...'} name={'search'} onChange={handleOnChange}/>
                    </CardsBarDiv>
                    <CardsBarDiv>
                        <span>Filter by continent or type of activity</span>
                        <CardsSelect value={selected.continent} onChange={handleOnChangeFilterContinent}>
                            {options.continent.map(option => (
                                <option key={option.value} value={option.value} disabled={option.value === ''}>{option.text}</option>
                            ))}
                        </CardsSelect>
                        <CardsSelect>
                            <option value={'Activity'} disabled>Activity</option>
                            <option value={'None'}>None</option>
                            <option value={'None'}>None</option>
                            <option value={'None'}>None</option>
                            <option value={'None'}>None</option>
                            <option value={'None'}>None</option>
                        </CardsSelect>
                    </CardsBarDiv>                    
                    <CardsBarDiv>
                        <span>Order by countries or population</span>
                        <CardsSelect value={selected.countries} onChange={handleOnChangeOrderCountriesByName}>
                            {options.countries.map(option => (
                                <option key={option.value} value={option.value} disabled={option.value === ''}>{option.text}</option>
                            ))}
                        </CardsSelect>
                        <CardsSelect value={selected.population} onChange={handleOnChangeOrderCountriesByPopulation}>
                            {options.population.map(option => (
                                <option key={option.value} value={option.value} disabled={option.value === ''}>{option.text}</option>
                            ))}
                        </CardsSelect>
                    </CardsBarDiv>
                </CardsBar>
                {
                    <CardsPagination>
                    {
                        allCountries.length > 0 ?
                        ButtonPagination(allCountries)
                        :
                        ''
                    }
                </CardsPagination>
                }
            </Wrapper>
            <Wrapper>                
                <CardsDiv>
                    {
                        countries.length > 0 ?
                        countries.map((country, index) => 
                            <Card key={index} id={country.id} name={country.name} continent={country.continent} image={country.image}/>
                        )                     
                        :
                        <h1>There are no countries to show!</h1>
                    }
                </CardsDiv>                
            </Wrapper>
        </CardsMain>
    )
}

export function mapStateToProps(state) {
    return {
        allCountries: state.country.allCountries,
        countries: state.country.countries
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        getAllCountries: (pageLimit) => dispatch(getAllCountries(pageLimit)),
        getCountriesPerPage: (start, end) => dispatch(getCountriesPerPage(start, end)),
        searchCountries: (name, pageLimit) => dispatch(searchCountries(name, pageLimit)),
        filterCountriesByContinent: (continent, pageLimit) => dispatch(filterCountriesByContinent(continent, pageLimit)),
        orderCountriesByName: (name, pageLimit) => dispatch(orderCountriesByName(name, pageLimit)),
        orderCountriesByPopulation: (population, pageLimit) => dispatch(orderCountriesByPopulation(population, pageLimit))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cards)