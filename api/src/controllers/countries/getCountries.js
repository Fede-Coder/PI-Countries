const { Country } = require('../../db')

async function getCountries() {
    const countries = await Country.findAll()
    return countries;
}

module.exports = { getCountries }