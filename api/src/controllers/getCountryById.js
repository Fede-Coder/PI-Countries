const { Country } = require('../db')

async function getCountryById(id) {
    if(!id) throw new Error('Country id required')
    const country = await Country.findOne({where: {id}})
    if(!country) throw new Error('Country not found')
    return country;
}

module.exports = { getCountryById }