var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port ", port);
});

// Mock DB data
PLAYERS = {
    "lee": {
        "name": "lee",
        "number": 8
    },
    "nora": {
        "name": "nora",
        "number": 0
    }
}

// Geeneric error handler
function handleError(res, reason, message, code) {
    console.log("Error: " + reason);
    res.status(code || 500).json({"error": message});
}

// get all players
app.get("/api/players", function(req, res) {
    res.status(200).json(PLAYERS);
});

// add a player
app.post("/api/players", function(req, res) {
    var newPlayer = req.body;
    if (newPlayer.hasOwnProperty("name") && newPlayer.hasOwnProperty("number")) {
        PLAYERS[newPlayer.name] = {
            "name": newPlayer.name,
            "number": newPlayer.number
        }
        res.status(201);
    } else {
        var message = "data is malformed, requires 'name' and 'number' keys"
        handleError(res, "Bad request", message, 400);
    }
});

// get a player by name
app.get("/api/players/:name", function(req, res) {

});
