const { Activity } = require('../../db')

async function deleteActivities(id) {
    if(!id) throw new Error('Id required')

    const findActivity = await Activity.findByPk(id)
    if(!findActivity) throw new Error(`Not exits id in db: ${id}`)
    await findActivity.destroy()
}

module.exports = { deleteActivities }