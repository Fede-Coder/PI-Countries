const { Country, Activity } = require('../../db');

async function createActivities(name, difficulty, duration, season, country) {
    if(!name) throw new Error('name required')
    if(!difficulty) throw new Error('difficulty required')
    if(!season) throw new Error('season required')
    if(!country) throw new Error('country required')

    console.log(name, difficulty, duration, season, country);

    const searchCountry = await Country.findOne({where: {name: country}})
    const activity = await Activity.create({name, difficulty, duration, season})
    await searchCountry.addActivity(activity)
}

module.exports = { createActivities }