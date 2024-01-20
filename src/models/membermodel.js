const mongoose = require("mongoose")
const User = require("../models/usersmodel")
const memberSchema = mongoose.Schema({
    userid:{
        type : mongoose.Schema.Types.ObjectId,
        ref : User,
    },
    firstname : { type:String},
    lastname : { type:String},
    contact: {type:String},
    houseno : {type:String},
    vehicle_details : {type:String},
    blood_group : {type:String},
    occupation : {type:String},
    job_address : {type:String}
})

module.exports = mongoose.model("Member",memberSchema)

