var express = require("express");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port ", port);
});

// Mock DB data
PLAYERS = [
    {name: "lee", number: 8},
    {name: "nora", number: 0}
];

// Geeneric error handler
function handleError(res, reason, message, code) {
    console.log("Error: " + reason);
    res.status(code || 500).json({"error": message});
}

// get all players
app.get("/api/players", function(req, res) {
    res.status(200).json({players: PLAYERS});
});

// add a player
app.post("/api/players", function(req, res) {
    var newPlayer = req.body;
    if (newPlayer.hasOwnProperty("name") && newPlayer.hasOwnProperty("number")) {
        PLAYERS.push({
            "name": newPlayer.name,
            "number": newPlayer.number
        });
        res.status(201);
    } else {
        var message = "data is malformed, requires 'name' and 'number' keys"
        handleError(res, "Bad request", message, 400);
    }
});

// get a player by name
app.get("/api/players/:name", function(req, res) {
    for (var i = 0; i < PLAYERS.length; i++) {
        if (PLAYERS[i].name === req.params.name) {
            res.status(200).json(PLAYERS[i]);
        }
    }
});
