const { Router } = require('express');
const { getCountries } = require('../controllers/countries/getCountries')
const { getCountryById } = require('../controllers/countries/getCountryById')
const { searchByName } = require('../controllers/countries/searchByName')

const { getActivities } = require('../controllers/activities/getActivities')
const { createActivities } = require('../controllers/activities/createActivities')


const router = Router();

router.get('/countries', async (req, res, next) => {
    const { name } = req.query;
    if(name) return next();    
    try {
        const result = await getCountries()
        res.status(200).send(result)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})

router.get('/countries/:idCountry', async (req, res) => {
    const { idCountry } = req.params;
    try {
        const result = await getCountryById(idCountry)
        res.status(200).send(result)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.get('/countries', async (req, res) => {
    const { name } = req.query;
    try {
        const result = await searchByName(name)
        res.status(200).json(result)        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.post('/activities', async (req, res) => {
    const {country, name, difficulty, duration, season} = req.body;
    try {
        await createActivities(name, difficulty, duration, season, country)
        res.status(201).json({message: 'Activity created'})        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.get('/activities', async (req, res) => {
    try {
        const result = await getActivities();
        res.status(200).json(result)        
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})

module.exports = router;
