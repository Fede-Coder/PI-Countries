const { Router } = require('express');
const { getCountries } = require('../controllers/getCountries')
const { getCountryById } = require('../controllers/getCountryById')
const { getCountriesByName } = require('../controllers/getCountriesByName')


const router = Router();

router.get('/countries', async (req, res, next) => {
    const { name } = req.query;
    if(name) return next();    
    try {
        const result = await getCountries()
        res.status(200).send(result)
    } catch (error) {
        res.status(400).json({error: error.message})
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
        const result = await getCountriesByName(name)
        res.status(200).json(result)        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.post('/activities', (req, res) => {
    const {} = req. body;
    try {
        res.status(201).json({message: 'successful'})
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.get('/activities', (req, res) => {
    try {
        res.status(200).json({message: 'successful'})
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports = router;
