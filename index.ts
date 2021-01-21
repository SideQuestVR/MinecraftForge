// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const app = express();
app.use(express.static(__dirname + 'static'));
app.use(bodyParser());
// https://expressjs.com/en/starter/basic-routing.html
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
    response.sendFile(__dirname + 'static/index.html')
})

// listen for requests :)
const listener = app.listen(80, () => {
    console.log("Your app is listening on port " + listener.address().port);
});
