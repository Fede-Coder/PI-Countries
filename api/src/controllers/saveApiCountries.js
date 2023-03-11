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
        await Country.bulkCreate(allCountries)
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { saveApiCountries }
/*
//db -> api receive -> type date from api
id -> cca3 -> String
name -> name.common -> Object
image -> flags[0] -> Array
continent -> region -> String 
capital -> capital -> Array
subregion -> subregion -> String
area -> area -> Number
population -> population -> Number
*/