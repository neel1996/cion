/*

    Script to read and return config data store elements
    Based on the data, the tiles will be displayed in CION home page

*/

const express = require('express');
const cors = require('cors');
const fs = require('fs');

var adminDataStoreKey = require('./admin-datastore-key-values');

var app = express();

app.use(cors());

app.use((req,res,next)=>{
    res.header({
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });

    next();
});

app.get('/configureditems',(req,res)=>{
    const adminKey = adminDataStoreKey.CONFIG_DATASTORE;
    var configDataStorePath = JSON.parse(fs.readFileSync('./datastore/admin-datastore.json'))[0].adminConsole[adminKey];

    var configuredItems = JSON.parse(fs.readFileSync(configDataStorePath, 'utf8'));

    res.json({
        configuredItems
    });

});

module.exports = app;