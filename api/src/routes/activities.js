const { Router } = require('express');

const { getActivities } = require('../controllers/activities/getActivities')
const { createActivities } = require('../controllers/activities/createActivities')

const router = Router();

router.post('/', async (req, res) => {
    const {country, name, difficulty, duration, season} = req.body;
    try {
        await createActivities(name, difficulty, duration, season, country)
        res.status(201).json({message: 'Activity created'})        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.get('/', async (req, res) => {
    try {
        const result = await getActivities();
        res.status(200).json(result)        
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})

module.exports = router;