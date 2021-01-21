// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.

import express = require('express');
import bodyParser = require('body-parser');

import fs = require('fs');
import http = require('http');
import https = require('https');
const privateKey  = fs.readFileSync(__dirname + '/ssl/private.pem', 'utf8');
const certificate = fs.readFileSync(__dirname + '/ssl/cert.pem', 'utf8');

const credentials = {key: privateKey, cert: certificate};

// your express configuration here

import * as fetch from "node-fetch";

declare let __dirname;
const app = express();
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);
app.use(express.static(__dirname + '/static'));
app.use(bodyParser());
app.post("/sqapi/:endpoint", async (request, response) => {
    let resp = await fetch('https://api.sidequestvr.com/' + request.params.endpoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request.body)
    });

    response.json(await resp.json())
});
app.get('/', async (request, response) => {
    response.sendFile(__dirname + '/static/index.html')
})

httpServer.listen(80);
httpsServer.listen(443);
