const mongoose = require("mongoose")


var Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/auth")

var userSchema = new Schema({
        username : String,
        email: String,
        password: String,
        age:Number
});
// Compile model from schema
module.exports = mongoose.model('user', userSchema );