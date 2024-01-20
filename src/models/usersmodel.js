const mongoose = require("mongoose")
const bcyrptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const UserSchema = mongoose.Schema({
    email :{
        type : String,
        // required :true,
    },
    password :{
        type:String,
        // required:true,
    },
    role:{
        type:String,
        // required:true,
    },
    created_at :{
        type:Date,
        default : Date.now()
    }
})
UserSchema.pre("save",async function(){
    try
    {
        if(this.isModified("password"))
        {
           this.password = await bcyrptjs.hash(this.password,10)
        }
    }catch(e)
    {
        console.log("Exception : ",e);
    }
})
UserSchema.methods.generateToken=(async function(){
    try
    {
        let token = await jwt.sign({_id:this._id},process.env.SKEY)
        //console.log("===>>TOKEN ",token);
        return token
    }catch(e)
    {
        console.log("");
    }
})
module.exports = mongoose.model("User",UserSchema)