const mongoose = require("mongoose")


mongoose.connect("mongodb://localhost:27017/mini_project")

const userSchema = new mongoose.Schema({
    username : String,
    name :String,
    email:String,
    password:String,
    age:Number,
    post:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    }]
},{timestamps:true})


module.exports = mongoose.model('user', userSchema )