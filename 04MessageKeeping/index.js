const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    fs.readdir(`./files`, (err, files) => {
        if (err) {
            return res.status(500).send("Error reading files");
        }
        res.render("index", { files });
    });
});

app.post("/create", (req, res) => {
    const fileName = req.body.title.split(" ").join("") + ".txt";  // Ensure no spaces in the filename
    const filePath = `./files/${fileName}`;
    fs.writeFile(filePath, req.body.details, (err) => {
        if (err) {
            return res.status(500).send("Error writing file");
        }
        res.redirect("/");
    });
});

app.get("/files/:filename", (req, res) => {
    const filePath = `./files/${req.params.filename}.txt`; // Ensure correct path and extension
    fs.readFile(filePath, "utf-8", (err, fileData) => {
        if (err) {
            return res.status(404).send("File not found");
        }
        res.render("show", { filename: req.params.filename, fileData });
    });
});

app.get("/edit/:filename", (req, res) => {
    res.render("edit", { filename: req.params.filename });
});

app.post("/edit", (req, res) => {
    const oldPath = `./files/${req.body.previous}.txt`;
    const newPath = `./files/${req.body.new}.txt`;

  
    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            return res.status(500).send("Error renaming file");
        }
        res.redirect("/");
    });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
