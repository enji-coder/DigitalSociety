const express = require("express")
const User = require("../src/models/usersmodel")
const Chairman = require("../src/models/chairmanmodel")
const Notice = require("../src/models/noticemodel")

exports.homepage = (req, res) => {
    res.render("index")
}
exports.login = (req, res) => {
    // res.send("login page")
    res.render("login")
}
exports.registerChairmanPage = (req, res) => {
    res.render("register")
}
exports.registerChairman = async (req, res) => {
    try {
        console.log("------->", req.body);
        const u = new User({
            email: req.body.email,
            password: req.body.password,
            role: "chairman"
        })
        //const u =await User(req.body).save()
        await u.save()
        if (u) {
            const chairman = new Chairman({
                userid : u,
                name : req.body.name,
                contact : req.body.contact,
                houseno:req.body.houseno
            })

            await chairman.save() 
            console.log("successfully created");
            res.render("login",{'smsg':"Successfully Account Created"})
            // this is for api result   // remove required validation for api purpose 
            //res.send({"status" : "200","message":"successfully data inserted"})
        }
        else
        {
            res.send({"status" : "404","message":"something went wrong"})
        }
    }
    catch (e) {
        console.log(e);
    }
}

exports.loginevalute = async (req,res)=>{
    const uid = await  User.findOne({email : req.body.email,password : req.body.password})
    const cid = await  Chairman.findOne({userid: uid})
    //console.log("--------------->>>> uid",uid);
    
    if (uid)
    {
        res.render("index",{'uid':uid,'cid':cid})
    }
    else
    {
        res.render("login",{'emsg':"invalid email or password"})
    }
    // data = {
    //     "email" : uid.email,
    //     "firstname" : cid.name,
    //     "contactno" : cid.contact
    // }
    // res.send({"status" : "200","data":data})  for api purpose 
}

exports.addNotice = async(req,res) =>{
    res.render("addNotice")
}
exports.addNoticeContent = async (req,res) =>{
    console.log(req.body);
    const nid = await Notice({
        title : req.body.title,
        description : req.body.description
    }).save()
    console.log("------------->>>> nid",nid);
    if (nid)
    {
        // for api purpose
        res.status(200).json({nid})
        //res.send({"status" : "200","data":nid})
        //res.render("addNotice")
    }
    else
    {
        res.send({"status" : "404","message":"Something went wrong "})
    }
}

