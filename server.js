'use strict';

let express = require("express");
let bodyParser = require("body-parser");
let { Client, Pool } = require("pg");

// load .env if not in prod
let SSL = true; // user SSL in prod, not on local host
if (process.env.NODE_ENV !== "production") {
    require("dotenv").load();
    SSL = false;
}

// configure express app
let app = express();
app.use(bodyParser.json());

// set where static angular generated dist files are stored
let distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// start app
let server = app.listen(process.env.PORT || 8080, function () {
    let port = server.address().port;
    console.log("App now running on port ", port);
});

// connection pool for postgreSQL DB connections
const POOL = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: SSL // heroku PG requries ssl
});

// Mock DB data
const PLAYERS = [
    {name: "lee", number: 8},
    {name: "nora", number: 0}
];

// Generic error handler
function handleError(res, reason, message, code) {
    console.log("Error: " + reason);
    res.status(code || 500).json({"error": message});
}

// get all posts
app.get("/api/posts", function(req, res) {
    // query DB
    // return an array of post objects
    const text = 'SELECT title, body FROM hardball.posts;'
    POOL.query(text, (err, result) => {
        if (err) throw err;
        const posts = [];
        for (let row of result.rows) {
            posts.push(row);
        }
        res.status(200).json({posts: posts})
    });
})

// get all players
app.get("/api/players", function(req, res) {
    res.status(200).json({players: PLAYERS});
});

// add a player
app.post("/api/players", function(req, res) {
    let newPlayer = req.body;
    if (newPlayer.hasOwnProperty("name") && newPlayer.hasOwnProperty("number")) {
        PLAYERS.push({
            "name": newPlayer.name,
            "number": newPlayer.number
        });
        res.status(201);
    } else {
        let message = "data is malformed, requires 'name' and 'number' keys"
        handleError(res, "Bad request", message, 400);
    }
});

// get a player by name
app.get("/api/players/:name", function(req, res) {
    for (let i = 0; i < PLAYERS.length; i++) {
        if (PLAYERS[i].name === req.params.name) {
            res.status(200).json(PLAYERS[i]);
        }
    }
});

// catch all other get requests to be sent index.html
// this allows the angular router to handle paths
app.get("/*", function(req, res) {
    res.sendFile(distDir + '/index.html')
});
