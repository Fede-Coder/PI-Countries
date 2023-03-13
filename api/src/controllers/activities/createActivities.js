const { Country, Activity } = require('../../db');

async function createActivities(name, difficulty, duration, season, country) {
    if(!name) throw new Error('name required')
    if(!difficulty) throw new Error('difficulty required')
    if(!season) throw new Error('season required')
    if(!country) throw new Error('country required')

    if(!Array.isArray(country)) throw new Error('country must be an array')
    if(country.length < 1) throw new Error('mush contain at least 1 country')

    if(await Activity.findOne({where: {name}})) throw new Error('already exists, type another activity name')

    const countries = await Country.findAll({where: {name: country}})
    const activity = await Activity.create({name, difficulty, duration, season})
    await activity.addCountry(countries)
}

module.exports = { createActivities }