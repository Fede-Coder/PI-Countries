const axios = require('axios')

async function saveApiCountries(Country) {
    try {
        const {data} = await axios('https://restcountries.com/v3/all');
        const allCountries = data.map(country => {
            return {
                id: country.cca3,
                name: country.name.common,
                image: country.flags[0],
                continent: country.region,
                capital: country.capital && country.capital[0],
                subregion: country?.subregion,
                area: country.area,
                population: country.population,
            }
        })
        await Country.bulkCreate(allCountries, {ignoreDuplicates: true})
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { saveApiCountries }