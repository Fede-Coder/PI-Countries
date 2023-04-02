const { Activity } = require('../../db');

async function getActivities() {
    const activities = await Activity.findAll({order: [['id', 'ASC']]});
    return activities;
}

module.exports = { getActivities }