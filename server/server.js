require('dotenv').config();
const helmet = require('helmet');
const {requestLogging} = require('./middleware/logging');
const express = require('express');
const server = express();
const PORT = process.env.PORT || 8000;

//Apply middleware
server.use(helmet());
server.use(requestLogging);

//Define routes
//No need to use a Router instance because the API only needs one route per path for the GET method.

const UserController = require('./controllers/UserController');

//Get user details
server.get('/api/users/:username', UserController.getUserDetails);
//List user repos
server.get('/api/users/:username/repos', UserController.getUserRepos);
//Search for a user by username
server.get('/api/search/:username', UserController.searchUsers);
//Search for repo commits
server.get('/api/repo', UserController.getCommits);

//default route rejecting all other requests
server.get('*', (request, response) => {
    response.status(400);
    response.end();
})

const http = server.listen(8000, () => {
    console.log(`Express server now listening on port ${PORT}`);
})

//Export the server to make the instance accessible to the test suite.
module.exports.server = server;
module.exports.http = http;
