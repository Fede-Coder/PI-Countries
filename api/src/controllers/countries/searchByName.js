const { Country, Op } = require('../../db')

async function searchByName(name) {
    if(!name) throw new Error('Country name required')
    const countries = await Country.findAll({where: {name: {[Op.iLike]: `${name}%`}}})
    if(!countries.length) throw new Error('Country not found')
    return countries;
}

module.exports = { searchByName }