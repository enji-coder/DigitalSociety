const express = require("express")
const User = require("../src/models/usersmodel")
const Chairman = require("../src/models/chairmanmodel")
const Notice = require("../src/models/noticemodel")
const Member = require("../src/models/membermodel")
const bcyrptjs = require("bcryptjs")
const cookieParser = require('cookie-parser');
const chairmanmodel = require("../src/models/chairmanmodel")
const ImageModel = require("../src/models/imagemodel")

exports.homepage = async(req, res) => {
    const no_of_notice = await Notice.find().count()
    //console.log("-------------------->>>>> no of notice",no_of_notice);
    res.render("index",{no_of_notice})
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
        // const password = "John2468$"
        // const hashedPassword = await bcrypt.hash(password, 8)
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
    // const uid = await  User.findOne({email : req.body.email,password : req.body.password})
    const uid = await User.findOne({email:req.body.email})

    const isValid = await bcyrptjs.compare(req.body.password,uid.password)

    if (isValid)
    {
        token = await uid.generateToken();
        //console.log(token);
        res.cookie("jwt",token)
        //console.log("---->Token",token);
        const cid = await  Chairman.findOne({userid: uid})
        //console.log("--------------->>>> uid",uid);    
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
        //res.status(200).json({nid})
        //res.send({"status" : "200","data":nid})
        s_msg = "Successfully notice added"
        res.render("addNotice",{'s_msg':s_msg})
    }
    else
    {
        res.send({"status" : "404","message":"Something went wrong "})
    }
}
exports.addNoticeApi = async (req,res) =>{
    let input = req.body; // fetch all data from input fields 
    Notice.create(input)
        .then((resData)=>{
            res.send({status : 200,data : resData})
        })
        .catch((e)=>{
            res.send({status : 400,message : e.message});
        })
    // console.log(req.body);
    // const nid = await Notice({
    //     title : req.body.title,
    //     description : req.body.description
    // }).save()
    // console.log("------------->>>> nid",nid);
    // if (nid)
    // {
    //     // for api purpose
    //     res.status(200).json({nid})
    //     res.send({"status" : "200","data":nid})
    //     // s_msg = "Successfully notice added"
    //     // res.render("addNotice",{'s_msg':s_msg})
    // }
    // else
    // {
    //     res.send({"status" : "404","message":"Something went wrong "})
    // }
}
exports.getNotice =async (req,res)  =>{
    const data =await Notice.find()
    const uid = req.uid
    const cid = req.cid
    //console.log("--->>> uid",uid.email);
    res.send({"status" : "200","data":data})
    //console.log("--->>> data",data);
    // res.render("noticelist",{data,uid,cid})
}
exports.editNotice = async(req,res)=>{
    const id = req.params.id
    console.log("---------->>>> id",id);
    const editData =await Notice.findById(req.params.id)
    console.log("----EDIT data ",editData.title);
    res.render("editNotice",{editData})
}
exports.updateNotice = async(req,res)=>{
    const resdata = await Notice.findByIdAndUpdate(req.body.id,req.body)
    res.redirect("/chairman/allNotice")
}
exports.deleteNotice = async(req,res)=>{
    const id = req.params.id
    const resdata = await Notice.findByIdAndDelete(id)
    console.log("----->>>> deleted");
    res.redirect("/chairman/allNotice")
}
exports.addMemberpage = async(req,res)=>{
    res.render("addMember")
}
exports.addMember = async(req,res)=>{
    console.log("---->>> email",req.body.email);
    const uid = new User({
        email: req.body.email,
        password: req.body.password,
        role: "member"
    })

    await uid.save()

    const mid = Member({
        userid : uid,
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        contact : req.body.contact,
        houseno : req.body.houseno,
        vehicle_details : req.body.vehicle_details,
        blood_group : req.body.blood_group,
        occupation : req.body.occupation,
        job_address : req.body.job_address
    })
    await mid.save() 
    
    s_msg = "Successfully Member added"
    res.render("addMember",{'s_msg':s_msg})
}
exports.logout = async(req,res)=>{
    res.clearCookie("jwt")
    res.render("login")
}

exports.singlepage = async(req,res)=>{
    res.render("singleimage")
}
exports.uploadsingleimage = async(req,res)=>{
    const imid = await ImageModel({
        img : req.file.filename,
    }).save()
    res.render("singleimage")
}
exports.displayIMage = async(req,res)=>{
    const iall = await ImageModel.find()
    console.log(iall);
    res.render("displayimage",{'iall':iall})
}

