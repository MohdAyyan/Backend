const express = require("express")
const {handleGenerateCreateURL} = require("../controllers/url")
const router = express.Router();

router.get("/",handleGenerateCreateURL)


module.exports = router;