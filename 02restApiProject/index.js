const express = require('express');

const fs = require('fs');
const app = express()
const mongoose = require("mongoose");
const { type } = require('os');

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,

    },
    last_name:{
        type: String
    },
    email:{
        type: String,
        required: true,
        unique : true
    },
    gender:{
        type: String,

    },
    job_title:{
        type: String,
    },
},{timestamps:true})

const User = mongoose.model("User",userSchema)

mongoose.connect("mongodb://localhost:27017/RestApiProject",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("connected to db")
    },
)
.catch((error)=> console.log("Mongo error",error)
)

app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.send("Hello World from home page")
})

app.get('/users', async(req, res) => {
    
    const allDbUsers = await User.find({});
    const html =` <ul>
    ${allDbUsers.map((user)=> `<li>${user.first_name} - ${user.email}</li>`).join("")}
    </ul>`;

    res.send(html)
})

app.get('/api/users',async(req,res)=>{
    const allDbUsers = await User.find({});

    return res.json(allDbUsers)
})

app.route('/api/users/:id')
.get(async(req, res) => {
    
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(404).json({error :"user not found"})
    }
    return res.json(user)
})
.patch(async(req, res) => {
    
      await User.findByIdAndUpdate(req.params.id,{last_name:"Changed"})

    return res.json({status :"Success"})
})
.delete(async(req, res) => {
    await User.findByIdAndDelete(req.params.id)
    
        return res.json({ status: "success" });
    });


    app.route('/api/users/:id')
    .put(async (req, res) => {
      const id = req.params.id;
      const user = await User.findById(id);
    
      if (!user) {
        return res.status(404).json({ status: "error", message: "User not found" });
      }
    
      const updatedUser = { ...user, ...req.body };
      await User.findByIdAndUpdate(id, updatedUser);
    
      return res.json({ status: "success", id: updatedUser.id });
    });



app.post("/api/users",async(req,res)=>{
    const body = req.body
    if (!body || !body.first_name || !body.last_name || !body.email || !body.job_title || !body.gender) {
        return res.status(400).json({msg: "All fields are req..."});
    }
   const result = await User.create({
    first_name: body.first_name,
    last_name : body.last_name,
        email : body.email,
        gender : body.gender,
        job_title : body.job_title,
    })
    console.log(result);
    
    return res.status(201).json({msg : "success"})
    })
   



    app.listen(8000, () => {
        console.log("Server Started");
      }).on('error', (err) => {
        console.error('Error starting server:', err);
      });

     
