const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const usersRouter = require('./users/users-router');
const plantsRouter = require('./plants/plants-router');

const server = express();

require('dotenv').config();
const port = process.env.PORT || 5000;

server.use(express.json());
server.use(cors());
server.use(helmet());

server.use('/plants', plantsRouter)
server.use('/users', usersRouter)

server.listen(port, () => {
    console.log(`server running on port ${port}`)
})

module.exports = server;