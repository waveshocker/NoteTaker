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
        notesData = fs.readFileSync("./Develop/db/db.json", "utf8");
        console.log("Notes Read");
        notesData = JSON.parse(notesData);
    }
    catch (err) {
        console.log("\n error (in app.get.catch):");
        console.log(err);
    }

    res.JSON(notesData);
});

// write new notes to JSON file

app.post("/api/notes", function(req, res) {
    try {
        notesData = fs.readFileSync("./Develop/db/db/json", "utf8");
        console.log(notesData);

        notesData = JSON.parse(notesData);

        notesData.push(req.body);

        notesData = JSON.stringify(notesData);

        fs.writeFile("./Develop/db/db.json", "utf8", function(err) {
            if (err) throw err;
        });
        res.json(JSON.parse(notesData));
    } catch(err) {
        throw err;
        console.error(err);
    } 
})



//Web page HTML

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/notes.html"));
});

//Default to index page if nothing specified is found
app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "Develop/public/index.html"));
});

app.get("/api/notes", function(req, res) {
    return res.sendFile(path.json(__dirname, "Develop/db/db.json"));
  });
  
  // Start the server on the port
  app.listen(PORT, function() {
    console.log("SERVER IS LISTENING: " + PORT);
  });