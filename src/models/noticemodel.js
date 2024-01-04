const mongoose  = require("mongoose")

const NoticeSchema =new mongoose.Schema({
    title : {type : String},
    description : {type:String},
},{timestamps : true})

module.exports = new mongoose.model("Notice",NoticeSchema)

