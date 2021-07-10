const express = require('express');
//const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = app => {
    app.use(express.json());                        // parse application/json ( body row json)  
    app.use(cors());
}
