const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/crud")
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
},
    email:{
        type: String,
        required :true,
        // unique: true
    },
    image:{
        type: String,
        require:true,
    }
},{timestamp:true})

module.exports = mongoose.model("user",userSchema)

 