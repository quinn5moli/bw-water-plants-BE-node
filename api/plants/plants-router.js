const express = require('express');
const router = express.Router();
const Plants = require('./plants-model');

router.get('/', function (req, res) {
    Plants.getPlants().then(plants => res.status(200).json(plants))
        .catch(err => res.status(500).json({ error: err, message: 'error getting plants' }));
})

router.get('/:id', function (req, res) {
    Plants.getPlantById(req.params.id).then(plant => res.status(200).json(plant))
        .catch(err => res.status(500).json({ error: err, message: 'could not get plant'}));
})

router.post('/', function (req, res) {
    Plants.addPlant(req.body).then(plant => res.status(200).json(plant))
        .catch(err => res.status(500).json({ error: err, message: 'could not add plant' }));
})

router.put('/:id', function (req, res) {
    const id = req.params.id;
    const plant = req.body;
    Plants.updatePlant({ id, plant }).then(updatedPlant => res.status(200).json(updatedPlant))
})

router.delete('/:id', function (req, res) {
    const id = req.params.id;
    Plants.deletePlant(id).then(() => res.status(200).json(`user ${id} destroyed`))
        .catch(err => res.status(500).json({ error: err, message: 'could not destroy plant'}));
})

module.exports = router;