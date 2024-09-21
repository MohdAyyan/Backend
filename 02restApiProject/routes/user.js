const express = require('express');
const {handleGetAllUsers
    ,handleGetUserById,
    handleUpdateById,
    handleDeleteById,
    handleCreateNewUser
} = require("../controllers/user")

const router = express.Router();

router.route("/")
.get(handleGetAllUsers)
.post(handleCreateNewUser)

router.route('/:id')
.get(handleGetUserById)
.patch(handleUpdateById)
.delete(handleDeleteById);


   module.exports = router;