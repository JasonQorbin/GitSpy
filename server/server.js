require('dotenv').config();
const helmet = require('helmet');
const {requestLogging} = require('./middleware/logging');
const express = require('express');
const server = express();
const path = require('path');
const PORT = process.env.PORT || 8000;

//Apply middleware
server.use(helmet({
    contentSecurityPolicy : {
        directives: {
            imgSrc: [
                `'self'`,
                `data:`,
                `*.githubusercontent.com`
            ]
        }
    }
}));
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

if (process.env.NODE_ENV !== 'production'){
    const projectRoot = require('path').resolve(__dirname, '..');
    server.use(express.static(path.join(projectRoot, 'frontend/build')));
    server.get('*',(req,res)=>
    {res.sendFile(path.resolve(projectRoot,
        'frontend', 'build','index.html'));
    });
}


const http = server.listen(8000, () => {
    console.log(`Express server now listening on port ${PORT}`);
})

//Export the server to make the instance accessible to the test suite.
module.exports.server = server;
module.exports.http = http;
