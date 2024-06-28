const express = require('express')
const app = express()

// import the port 
app.listen(3000, () => {
    console.log('Server Is Working Port 3000');
});

// Write the get method
app.get('/', (request, response) => {
    response.send('Hello World')
});