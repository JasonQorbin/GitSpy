const express = require('express');
const server = express();
const PORT = process.env.PORT || 8000;

server.get('/', (request, response) => {
    response.send("Hi, from the server!");
})

const http = server.listen(8000, () => {
    console.log(`Express server now listening on port ${PORT}`);
})

//Export the server to make the instance accessible to the test suite.
module.exports.server = server;
module.exports.http = http;
