const express = require("express")
const url = require("url")
const http = require('http');


const app = express()   

app.get("/", (req, res) => {
    res.send("Hello World from home page")

})

app.get("/about", (req, res) => {
    res.send("Hello World from about page")
})

// const myServer = http.createServer(app);
// myServer.listen(3000, () => {
//     console.log("Server Started");
    
// })

app.listen(3000,()=> console.log("Server Started"));
