const mongoose = require('mongoose');

async function connectMongoDb() {
    return mongoose.connect("mongodb://localhost:27017/RestApiProject").then(()=>console.log("mongo db connected")
    )
}

module.exports={
    connectMongoDb
}