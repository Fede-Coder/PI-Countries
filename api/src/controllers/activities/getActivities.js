const { Activity } = require('../../db');

async function getActivities() {
    const activities = await Activity.findAll();
    return activities;
}

module.exports = { getActivities }