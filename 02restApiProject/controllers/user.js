const User = require("../models/user")
async function handleGetAllUsers(req,res) {

    const allDbUsers = await User.find({});

    return res.json(allDbUsers)
    
}

 async function handleGetUserById(req,res) {
    async(req, res) => {
    
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({error :"user not found"})
        }
        return res.json(user)
    }
}

async function handleUpdateById(req,res) {
    await User.findByIdAndUpdate(req.params.id,{last_name:"Changed"})

    return res.json({status :"Success"})
}
async function handleDeleteById(req,res) {
    await User.findByIdAndDelete(req.params.id)
    
    return res.json({ status: "success" });

}

 async function handleCreateNewUser(req,res){
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
    
    return res.status(201).json({msg : "success",id: result._id})
 }
module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateById,
    handleDeleteById,
    handleCreateNewUser
}