import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Wrapper } from '../../assets/css/styledGlobal';
import { clearCountryDetail, getCountryDetail, setFilterCountries, setSearch } from '../../redux/actions/CountryAction';
import { DetailActivitiesButton, DetailActivitiesButtonDiv, DetailActivitiesDiv, DetailButton, DetailContinent, DetailDiv, DetailDivSkeleton, DetailImg, DetailInfo, DetailMain, DetailTitle, DetailTitleSkeleton, SkeletonSpan } from './StyledDetail';

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
import NotFound from '../NotFound/NotFound';

export default function Detail() {

    const selector = useSelector((state) => state.country)
    const dispatch = useDispatch()

    const { detailId } = useParams()
    const navigate = useNavigate()

    React.useEffect(() => {
        dispatch(getCountryDetail(detailId))
        return () => {
            dispatch(clearCountryDetail())
        };
    }, [dispatch, detailId]);

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
                    selector.isFetching 
                    ?
                    <>
                        <DetailTitleSkeleton>
                            <SkeletonSpan></SkeletonSpan>
                        </DetailTitleSkeleton>
                        <DetailDivSkeleton>                            
                            <div className='image'>
                                <SkeletonSpan width='80%' height='20vh'></SkeletonSpan>
                            </div>
                            <div className='info'>
                                <SkeletonSpan width='30%' height='4vh'></SkeletonSpan>
                                <SkeletonSpan width='40%' height='2vh'></SkeletonSpan>
                                <SkeletonSpan width='50%' height='2vh'></SkeletonSpan>
                                <SkeletonSpan width='20%' height='2vh'></SkeletonSpan>
                                <SkeletonSpan width='30%' height='2vh'></SkeletonSpan>
                            </div>
                        </DetailDivSkeleton>
                    </>
                    :
                    <>
                        <DetailButton onClick={handleOnClickBack}>Back</DetailButton>
                        {
                            Object.keys(selector.countryDetail).length > 0
                            ? 
                            <>
                                <DetailTitle>{selector.countryDetail.name} [{selector.countryDetail.id}]</DetailTitle>
                                <DetailDiv>
                                    <DetailImg>
                                        <img src={selector.countryDetail.image} alt={selector.countryDetail.name} />
                                    </DetailImg>

                                    <DetailInfo>
                                        <h1>Information</h1>
                                        <ul>
                                            <li><span>Continent:</span> {selector.countryDetail.continent}</li>
                                            <li><span>Capital:</span> {selector.countryDetail.capital ? selector.countryDetail.capital : 'None'}</li>
                                            <li><span>Subregion:</span> {selector.countryDetail.subregion ? selector.countryDetail.subregion : 'None'}</li>
                                            <li><span>Area:</span> {selector.countryDetail.area.toLocaleString('en-US')} km²</li>
                                            <li><span>Population:</span> {selector.countryDetail.population.toLocaleString('en-US')}</li>
                                        </ul>
                                    </DetailInfo>
                                
                                    <DetailContinent>
                                        {getContinent(selector.countryDetail.continent)}
                                    </DetailContinent>
                                </DetailDiv>
                                {
                                    selector.countryDetail.activities.length > 0 &&
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
                                                selector.countryDetail.activities.map((act, index) =>
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
                        <NotFound />
                        }
                    </>
                    
                }
            </Wrapper>
        </DetailMain>
    )
}