const express = require('express');
 const userRouter = require("./routes/user.js")
const fs = require('fs');
const app = express()
const {connectMongoDb} = require("./conn.js")

const { type } = require('os');
const {logReqRes} = require("./middlewares/index.js")



connectMongoDb()

app.use(express.urlencoded({extended:false}))
app.use(logReqRes("log.txt"));

app.use("/api/users",userRouter)

 app.listen(8000, () => {
        console.log("Server Started");
      }).on('error', (err) => {
        console.error('Error starting server:', err);
      });

     
