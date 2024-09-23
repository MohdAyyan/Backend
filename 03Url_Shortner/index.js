const express = require('express');
const urlRoute = require("./routes/url");
const connectMongoDb = require('./connect');
const app = express()
const URL = require("./models/url")


connectMongoDb("mongodb://localhost:27017/short-url")
.then(() => console.log("Mongo Db connected")
).catch((err)=> console.log("connection failed in mongoDb",err)
)

app.use(express.json())
app.use("/url",urlRoute)

app.get("/",async(req,res)=>{
    const shortId = req.params.shortId;
    await URL.findOneAndUpdate({
        shortId
    },{$push:{
        visitHistory: {
            timestamp:Date.now()
        }
    }})
    res.redirect(entry.requireURL)
})


app.listen(8001,()=>console.log("server started at 8001")
)
