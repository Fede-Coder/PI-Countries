import React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Wrapper } from '../../assets/css/styledGlobal';
import { clearCountryDetail, getCountryDetail } from '../../redux/actions/CountryAction';
import { DetailActivitiesButton, DetailActivitiesDiv, DetailButton, DetailDiv, DetailImg, DetailInfo, DetailMain, DetailTitle } from './StyledDetail';

export function Detail(props) {
    const { getCountryDetail, clearCountryDetail, countryDetail } = props
    const { detailId } = useParams()
    const navigate = useNavigate()

    React.useEffect(() => {
        getCountryDetail(detailId)
        return () => {
            clearCountryDetail()
        };
    }, [getCountryDetail, detailId, clearCountryDetail]);

    const handleOnClickBack = () => {
        navigate(-1)
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
                                <li><span>Subregion:</span> {countryDetail.subregion}</li>
                                <li><span>Area:</span> {countryDetail.area.toLocaleString('en-US')} km²</li>
                                <li><span>Population:</span> {countryDetail.population.toLocaleString('en-US')}</li>
                            </ul>
                        </DetailInfo>
                    </DetailDiv>
                    {
                        countryDetail.activities.length > 1 &&
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
                                        <DetailActivitiesButton key={index}>
                                            <div>{act.name}</div>
                                            <div>{act.difficulty}</div>
                                            <div>{act.duration}</div>
                                            <div>{act.season}</div>
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