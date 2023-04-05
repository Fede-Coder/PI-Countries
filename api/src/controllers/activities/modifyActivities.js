const { Country, Activity } = require('../../db')

async function modifyActivities(id, name, difficulty, duration, season, countryAdd, countryRemove) {
    if(!id) throw new Error('Id required')
    if(!name) throw new Error('name required')
    if(!difficulty) throw new Error('difficulty required')
    if(!duration) throw new Error('duration required')
    if(!season) throw new Error('season required')
    if(!countryAdd) throw new Error('countryAdd required')
    if(!countryRemove) throw new Error('countryRemove required')

    if(!Array.isArray(countryAdd)) throw new Error('countryAdd must be an array')
    if(!Array.isArray(countryRemove)) throw new Error('countryRemove must be an array')

    const findActivty = await Activity.findByPk(id)
    if(!findActivty) throw new Error(`Not exist id in db: ${id}`)

    findActivty.name = name
    findActivty.difficulty = difficulty
    findActivty.duration = duration
    findActivty.season = season

    await findActivty.save()
    await findActivty.reload()
    
    if(countryAdd.length > 0) {
        const countries = await Country.findAll({where: {name: countryAdd}})
        if(countries.length) await findActivty.addCountry(countries)
    }
    
    if(countryRemove.length > 0) {
        const countries = await Country.findAll({where: {name: countryRemove}})
        if(countries.length) await findActivty.removeCountry(countries)
    }

    return findActivty;    
}

module.exports = { modifyActivities }