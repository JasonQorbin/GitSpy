const express = require('express');
const server = express();
const PORT = process.env.PORT || 8000;

server.get('/', (request, response) => {
    response.send("Hi, from the server!");
})

server.listen(8000, () => {
    console.log(`Express server now listening on port ${PORT}`);
})