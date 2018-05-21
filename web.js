const express = require('express');
const hbs = require('hbs');
const path = require('path');

module.exports = app => {
    // read config file
    let serverBy;
    let version;
    try {
        let serverConfig = require('./config');
        serverBy = serverConfig['serverBy'];
        if (serverBy !== undefined && serverBy.trim() === '') serverBy = null;
        let versionFile = require('./version');
        version = versionFile['version'];
    } catch (err) {
        serverBy = null;
        version = 'Unknown version';
    }

    // template engine
    app.set('view engine', 'hbs');

    // static files
    app.use(express.static(path.join(__dirname, 'public')));

    // routes
    app.get('/', (req, res) => {
        res.render('index', {
            appVersion: version,
            nodeVersion: process.version,
        });
    });
};
