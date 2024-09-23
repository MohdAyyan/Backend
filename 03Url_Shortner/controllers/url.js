
const {shortid} = require("shortid")
const URL = require("../models/url")
async function handleGenerateCreateURL(req,res) {
    const shortID = shortid()
    const body = req.body
    await URL.create({
        shortid: shortID,
        redirectURL: body.url,
        visitHistory: []
    })
    return res.status(201).json({id : shortID})
}

module.exports = {
    handleGenerateCreateURL,
}