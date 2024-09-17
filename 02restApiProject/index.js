const express = require('express');
const users = require("./MOCK_DATA.json")
const fs = require('fs');
const app = express()

app.use(express.urlencoded({extended:false}))

app.get("/",(req,res)=>{
    res.send("Hello World from home page")
})

app.get('/users', (req, res) => {
    res.send(users.map((user)=>(
        `<li>${user.first_name} ${user.last_name}</li>`
       )).join(""))
})

app.get('/api/users',(req,res)=>{
    res.send(users)
})

app.route('/api/users/:id')
.get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    return res.json(user)
})
.patch((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({ status: "error", message: "User not found" });
    }

    const updatedUser = { ...user, ...req.body };
    const index = users.indexOf(user);
    users[index] = updatedUser;

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({ status: "success", id: updatedUser.id });
    });
})
.delete((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
        return res.status(404).json({ status: "error", message: "User not found" });
    }

    users.splice(index, 1);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({ status: "success" });
    });
});

app.route('/api/users/:id')
.put((req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }

  const updatedUser = { ...user, ...req.body };
  const index = users.indexOf(user);
  users[index] = updatedUser;

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: updatedUser.id });
  });
})



app.post("/api/users",(req,res)=>{
    const body = req.body
    users.push({...body,id: users.length + 1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => { 
        return res.json({status :"success",id: users.length })
    })
   
})


app.listen(3000,()=> console.log("Server Started"));