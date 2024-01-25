const mongoose = require("mongoose")
const bcyrptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const imageModel = mongoose.Schema({
    img : {type : String}
})
module.exports = mongoose.model("ImageModel",imageModel)