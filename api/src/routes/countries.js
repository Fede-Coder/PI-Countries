const { Router } = require('express');

const { getCountries } = require('../controllers/countries/getCountries')
const { getCountryById } = require('../controllers/countries/getCountryById')
const { searchByName } = require('../controllers/countries/searchByName')

const router = Router();

router.get('/', async (req, res, next) => {
    const { name } = req.query;
    if(name) return next();    
    try {
        const result = await getCountries()
        res.status(200).send(result)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})

router.get('/:idCountry', async (req, res) => {
    const { idCountry } = req.params;
    try {
        const result = await getCountryById(idCountry)
        res.status(200).send(result)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.get('/', async (req, res) => {
    const { name } = req.query;
    try {
        const result = await searchByName(name)
        res.status(200).json(result)        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

module.exports = router;