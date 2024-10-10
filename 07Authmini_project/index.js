const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const userModel = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const postModel = require("./models/post");

const app = express();

app.set("view engine", "ejs");
// app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/",(req,res)=>{
  res.render("index")
})

app.get("/login",(req,res)=>{
    res.render("login")
})

app.get("/profile",isLoggedIn,(req,res)=>{
  res.render("login")
})


app.post("/register", async (req, res) => {
  const { name, username, email, password, age } = req.body;
  let user = await userModel.findOne({email});

  if (user)  return res.status(400).send( "User already exists" );
  
  bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password,salt,async(err,hash)=>{

        const createdUser = await userModel.create({
          username,
          email,
          password:hash,
          age,
          name
        })
        
        let token = jwt.sign({ email, userid: createdUser._id }, "shhhhhhhh");
        res.cookie("token",token)
        res.send("registered")
    })

})
})

app.post("/login",async(req,res)=>{
  const {email,password}=req.body
  const user =await userModel.findOne({email})
  if(!user) return res.status(400).send("Something went wrong");
  bcrypt.compare(password,user.password,(err,result)=>{
      if(!result) return res.status(400).send("Something went wrong");
      else {
        
        let token = jwt.sign({ email, userid: user._id }, "shhhhhhhh");
        res.cookie("token",token);
        res.status(200).send("you can login");
      }})
})

app.get("/logout",(req,res)=>{
  res.cookie("token","")
  res.redirect("/login")
})

function isLoggedIn(req,res,next) {
  if (req.cookies.token === "") res.send("You must be logged in")
  else{
    const data= jwt.verify(req.cookies.token,"shhhhhhhh")
    res.user = data;
    next()
  }

}

app.listen(3000, () => {
  console.log("Server Started on port 3000");
});


