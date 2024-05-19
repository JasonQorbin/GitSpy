require('dotenv').config();
const express = require('express');
const server = express();
const PORT = process.env.PORT || 8000;

const UserController = require('./controllers/UserController');

server.get('/', (request, response) => {
    response.send("Hi, from the server!");
})

//Get user details
server.get('/users/:username', UserController.getUserDetails);
//List user repos
server.get('/users/:username/repos', UserController.getUserRepos);

const http = server.listen(8000, () => {
    console.log(`Express server now listening on port ${PORT}`);
})

//Export the server to make the instance accessible to the test suite.
module.exports.server = server;
module.exports.http = http;
