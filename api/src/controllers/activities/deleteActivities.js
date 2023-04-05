const { Activity } = require('../../db')

async function deleteActivities(id) {
    if(!id) throw new Error('Id required')
    if(isNaN(id)) throw new Error('Id only number')

    const findActivity = await Activity.findByPk(Number(id))
    if(!findActivity) throw new Error(`Not exits id in db: ${id}`)
    await findActivity.destroy()
}

module.exports = { deleteActivities }