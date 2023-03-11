const { Country } = require('../db')

async function getCountries() {
    const countries = await Country.findAll()
    if(!countries.length) throw new Error('Empty countries')
    return countries;
}

module.exports = { getCountries }