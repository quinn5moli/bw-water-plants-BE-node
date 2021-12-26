const Users = require('./users-model');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const dbConfig = require('../../data/dbConfig');

function restricted(req, res, next) {
    const authHeader = req.headers. authorization;
    if (authHeader) {
        const token = authHeader;
        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if(err) {
                console.log(err)
                return res.status(401).json({ message: 'invalid token' })
            } else {
                next()
            }
        })
    } else {
        return res.status(401).json({ message: 'You must be logged in to access this page.' })
    }
}

async function checkUsername(req, res, next) {
    const users = await Users.getUserBy({ username: req.body.username });
    if (users) {
        res.status(422).json({ message: `username ${req.body.username} unavailable`})
    } else {
        next()
    }
}

function checkPasswordLength(req, res, next) {
    if(!req.body.password || req.body.password.length < 3) {
        next({ message: 'Password must be longer than 3 chars', status: 422 })
    } else {
        next();
    }
}

async function checkCredentials(req, res, next) {
    const { username, password } = req.body;
    const user = await dbConfig.getUserBy({ username });
    if (user) {
        const isValid = bcrypt.compareSync(password, user.password);
        if (isValid) {
            next()
        } else {
            res.status(401).json({ message: 'invalid password' })
        }
    } else {
        res.status(404).json({ message: `username ${req.body.username} does not exist`})
    }
}

module.exports = {
    restricted,
    checkUsername,
    checkCredentials,
    checkPasswordLength,
}