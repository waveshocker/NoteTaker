const express = require("express");
const path = require("path");
const fs = require("fs");

// creating an "express" server
const app = express();
// Sets an Initial port for listeners
const PORT = 3000;

//  Initialize notesData

let notesData = [];

// Set up body parsing, static, and route middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "Develop/public")));


//Function to take in notes

app.get("/api/notes", function(req, res) {
    try {
        // read notes from database file
        notesData = fs.readFileSync("Develo/db/db.json", "utf8");
        console.log("Notes Read");
        notesData = JSON.parse(notesData);
    }
    catch (err) {
        console.log("\n error (in app.get.catch):");
        console.log(err);
    }

    res.JSON(notesData);
});

//Web page HTML

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
});