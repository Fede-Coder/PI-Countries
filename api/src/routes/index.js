const { Router } = require('express');


const router = Router();

router.get('/countries', (req, res) => {
    try {
        res.status(200).json({message: 'successful'})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.get('/countries/:idCountry', (req, res) => {
    const { idCountry } = req.params;
    try {        
        res.status(200).json({message: 'successful'})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

router.get('/countries', (req, res) => {
    const { name } = req.query;
    try {
        res.status(200).json({message: 'successful'})
        
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
