
const mongoose = require("mongoose");
const shortid = require("shortid");

const urlSchema =new mongoose.Schema({
    shortid:{
        type: String,
        required: true,
        unique: true
    },
    redirectURL :{
        type: String,
        required: true
    },
    visitHistory :[{timestamp:{type:Number}}]
},{timestamps:true});
// Compile model from schema
const url = mongoose.model('url', urlSchema );

module.exports = url