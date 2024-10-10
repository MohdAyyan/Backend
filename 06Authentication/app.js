const express = require("express")
const path = require("path")
const userModel = require("./models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const app = express()

app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
    res.render("index")
})

app.post("/create", (req, res) => {
    let { username, email, password, age } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {

            const createdUser = await userModel.create({
                username,
                email,
                password: hash,
                age
            })

            let token=jwt.sign({email},"shhhhhhhh")

            res.cookie("token",token)

            res.send(createdUser)

        })
    })

})

app.get("/login", async (req, res) => {
    res.render("login")
})

app.post("/login",async(req,res)=>{
    let {email,password}=req.body

    const user=await userModel.findOne({email})

    bcrypt.compare(password,user.password,(err,result)=>{
        if(result){
            let token=jwt.sign({email},"shhhhhhhh")
            res.cookie("token",token)
            res.redirect("/")
        }
        else{
            res.send("Invalid Credentials")
        }
    })

})

app.get("/logout",(req,res)=>{
    res.cookie("token","")
    res.redirect("/")

})

app.listen((3000), (req, res) => {
    console.log("Server Started");

})

