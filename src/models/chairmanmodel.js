const mongoose = require("mongoose")
const User = require("../models/usersmodel")
const chairmanSchema = mongoose.Schema({
    userid:{
        type : mongoose.Schema.Types.ObjectId,
        ref : User,
    },
    name : {
        type:String,
        required : true
    },
    contact:{
        type:String,
        required : true
    },
    houseno : {
        type:String,
        required : true
    }
})

module.exports = mongoose.model("Chairman",chairmanSchema)