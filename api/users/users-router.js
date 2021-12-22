const express = require('express');
const router = express.Router();
const Users = ('./users-model.js');
const { restricted, checkUsername, checkCredentials, checkPasswordLength} = require('./auth-middleware');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', restricted, (req, res) => {
    Users.getUsers().then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({ error: err, message: 'could not get users'}));
});

router.post('/', checkUsername, checkPasswordLength, (req, res) => {
    Users.addUser(req.body).then(user => res.status(200).json(user))
        .catch(err => res.status(500).json({ error: err, message: 'user could not be added'}));
})

router.post('/login', checkCredentials, async (req, res) => {
    const user = await Users.loginUser(req.body)
        .then(token => res.status(200).json(token))
        .catch(err => res.status(500).json({ error: err, message: 'could not log in'}));

})

router.get('/:id', restricted, (req, res) => {
    Users.getUserById(req.params.id).then(user => res.status(200).json(user))
        .catch(err => res.status(500).json({ error: err, message: 'could not get user' }));
})

router.get('/:id/plants', restricted, (req, res) => {
    Users.getUsesrPlants(req.params.id).then(plants => res.status(200).json(plants))
        .catch(err => res.status(500).json({ error: err, message: 'could not get plants' }));
})

router.post('/:id/plants', restricted, (req, res) => {
    const payload = { user_id: req.params.id, plant_id: req.body.plant_id };
    Users.addUserPlant(payload).then(plants => res.status(200).json(plants))
        .catch(err => res.status(500).json({ error: err, message: 'could not add plant'}));
})

router.delete('/:id/plants', restricted, (req, res) => {
    const payload = { user_id: req.params.id, plant_id: req.body.plant_id };
    Users.deleteUserPlant(payload).then(plants => res.status(200).json(plants))
        .catch(err => res.status(500).json({ error: err, message: 'could not delete plant' }));
})

router.put('/:id', restricted, (req, res) => {
    Users.updateUser({ id: req.params.id, user: req.body })
        .then(updatedUser => res.status(200).json(updatedUser))
        .catch(err => res.status(500).json({ error: err, message: 'could not update user' }));
})

router.delete('/:id', restricted, (req, res) => {
    Users.deleteUser(req.params.id).then(user => res.status(200).json({ message: 'user destroyed', user }))
        .catch(err => res.status(500).json({ error: err, message: 'could not destroy user'}));
})

module.exports = router;