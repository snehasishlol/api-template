const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const limits = require('../config/limits');

const loadRoutes = (method, folderPath) => {
    fs.readdirSync(folderPath).forEach((file) => {
        const route = require(path.join(folderPath, file));
        

        router[method](route.route, route.handler);
    });
};

const methods = ['get', 'post', 'put', 'patch', 'delete'];
methods.forEach((method) => {
    const folderPath = path.join(__dirname, method);
    if (fs.existsSync(folderPath)) {
        loadRoutes(method, folderPath);
    }
});

module.exports = router;
