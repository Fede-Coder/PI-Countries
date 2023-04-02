const { Router } = require('express');

const { getActivities } = require('../controllers/activities/getActivities')
const { createActivities } = require('../controllers/activities/createActivities');
const { deleteActivities } = require('../controllers/activities/deleteActivities');
const { modifyActivities } = require('../controllers/activities/modifyActivities');

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

router.put('/', async (req, res) => {
    const { id, name, difficulty, duration, season, countryAdd, countryRemove } = req.body
    try {
        const result = await modifyActivities(id, name, difficulty, duration, season, countryAdd, countryRemove)
        res.status(200).send(result)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.delete('/', async (req, res) => {
    const { id } = req.body
    try {
        await deleteActivities(id)
        res.status(200).json({message: 'Deleted activity'})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports = router;