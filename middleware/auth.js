const jwt = require("jsonwebtoken")
const User = require("../src/models/usersmodel")
const Chairman = require("../src/models/chairmanmodel")
const auth = async(req,res,next)=>{
    try
    {
        token = req.cookies.jwt;
        console.log(token);
        const data = jwt.verify(token,process.env.SKEY);
        if(data)
        {
            console.log(data);
            const userdata = await User.findOne({_id:data._id})
            req.uid = userdata
            req.cid = await  Chairman.findOne({userid: userdata})
            next();
        }else
        {
            console.log("--->inside the else",token);
            res.render("login")
        }
    }catch(e)
    {
        console.log("====> e",e);
        res.render("login")
    }
}

module.exports = auth;