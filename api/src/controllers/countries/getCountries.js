const { Country, Activity } = require('../../db')

async function getCountries() {
    const countries = await Country.findAll({include: [{model: Activity, through: {attributes: [] }}]})
    return countries;
}

module.exports = { getCountries }