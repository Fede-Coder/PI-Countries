import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Wrapper } from '../../assets/css/styledGlobal';
import { clearCountryDetail, getCountryDetail, setFilterCountries, setSearch } from '../../redux/actions/CountryAction';
import { DetailActivitiesButton, DetailActivitiesButtonDiv, DetailActivitiesDiv, DetailButton, DetailContinent, DetailDiv, DetailImg, DetailInfo, DetailMain, DetailTitle } from './StyledDetail';

import Summer from '../../assets/icons/summer.svg';
import Fall from '../../assets/icons/fall.svg';
import Winter from '../../assets/icons/winter.svg';
import Spring from '../../assets/icons/spring.svg';

import Americas from '../../assets/icons/continents/americas-min.png'
import Europe from '../../assets/icons/continents/europa-min.png'
import Africa from '../../assets/icons/continents/africa-min.png'
import Oceania from '../../assets/icons/continents/oceania-min.png'
import Asia from '../../assets/icons/continents/asia-min.png'
import Antarctic from '../../assets/icons/continents/antartida-min.png'

export function Detail(props) {
    const { getCountryDetail, clearCountryDetail, countryDetail } = props
    const { detailId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    React.useEffect(() => {
        getCountryDetail(detailId)
        return () => {
            clearCountryDetail()
        };
    }, [getCountryDetail, detailId, clearCountryDetail]);

    const handleOnClickBack = () => {
        navigate(-1)
    }

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

    const getContinent = (name) => {
        switch (name) {
            case 'Americas':                
                return <img src={Americas} alt={name} />
            case 'Europe':                
                return <img src={Europe} alt={name} />
            case 'Africa':                
                return <img src={Africa} alt={name} />
            case 'Oceania':                
                return <img src={Oceania} alt={name} />
            case 'Asia':                
                return <img src={Asia} alt={name} />
            case 'Antarctic':                
                return <img src={Antarctic} alt={name} />        
            default:
                return '';
        }
    }

    const handleOnClickActivity = (name) => {
        dispatch(setFilterCountries('Activity', name))
        dispatch(setSearch(''))
        navigate('/home')
    }

    return(
        <DetailMain>
            <Wrapper>
                {
                    Object.keys(countryDetail).length > 0 ? 
                <>
                    <DetailButton onClick={handleOnClickBack}>Back</DetailButton>
                    <DetailTitle>{countryDetail.name} [{countryDetail.id}]</DetailTitle>
                    <DetailDiv>
                        <DetailImg>
                            <img src={countryDetail.image} alt={countryDetail.name} />
                        </DetailImg>
                        <DetailInfo>
                            <h1>Information</h1>
                            <ul>
                                <li><span>Continent:</span> {countryDetail.continent}</li>
                                <li><span>Capital:</span> {countryDetail.capital ? countryDetail.capital : 'None'}</li>
                                <li><span>Subregion:</span> {countryDetail.subregion ? countryDetail.subregion : 'None'}</li>
                                <li><span>Area:</span> {countryDetail.area.toLocaleString('en-US')} km²</li>
                                <li><span>Population:</span> {countryDetail.population.toLocaleString('en-US')}</li>
                            </ul>
                        </DetailInfo>
                        
                        <DetailContinent>
                            {getContinent(countryDetail.continent)}
                        </DetailContinent>
                    </DetailDiv>
                    {
                        countryDetail.activities.length > 0 &&
                        <>
                            <DetailTitle>Activities list</DetailTitle>
                            <DetailActivitiesDiv>
                                <div>
                                    <h3>Name</h3>
                                    <h3>Difficulty</h3>
                                    <h3>Duration</h3>
                                    <h3>Season</h3>
                                </div>
                                {
                                    countryDetail.activities.map((act, index) =>
                                        <DetailActivitiesButton key={index} onClick={() => handleOnClickActivity(act.name)}>
                                            <DetailActivitiesButtonDiv>{act.name}</DetailActivitiesButtonDiv>
                                            <DetailActivitiesButtonDiv isBar valueDiff={act.difficulty}><span>{act.difficulty*20}%</span><div></div></DetailActivitiesButtonDiv>
                                            <DetailActivitiesButtonDiv>{act.duration} hrs.</DetailActivitiesButtonDiv>
                                            <DetailActivitiesButtonDiv>{getIconSeason(act.season)}<div>{act.season}</div></DetailActivitiesButtonDiv>
                                        </DetailActivitiesButton>
                                    )
                                }
                            </DetailActivitiesDiv>
                        </>
                    }
                </>
                :
                ''
                }
            </Wrapper>
        </DetailMain>
    )
}

export function mapStateToProps(state) {
    return {
        countryDetail: state.country.countryDetail
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        getCountryDetail: (id) => dispatch(getCountryDetail(id)),
        clearCountryDetail: () => dispatch(clearCountryDetail())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)