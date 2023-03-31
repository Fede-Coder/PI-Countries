const { Activity } = require('../../db')

async function modifyActivities(id, name, difficulty, duration, season, country) {
    if(!id) throw new Error('Id required')
    if(!name) throw new Error('name required')
    if(!difficulty) throw new Error('difficulty required')
    if(!duration) throw new Error('duration required')
    if(!season) throw new Error('season required')
    if(!country) throw new Error('country required')

    if(!Array.isArray(country)) throw new Error('country must be an array')
    if(country.length < 1) throw new Error('mush contain at least 1 country')

    const findActivty = await Activity.findByPk(id)
    if(!findActivty) throw new Error(`Not exist id in db: ${id}`)

    findActivty.name = name
    findActivty.difficulty = difficulty
    findActivty.duration = duration
    findActivty.season = season
    // findActivty.country = country por la asociación, ver mas info

    await findActivty.save()
    await findActivty.reload()

    return findActivty;    
}

module.exports = { modifyActivities }