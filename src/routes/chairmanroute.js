const express = require("express");
const { homepage, login, registerChairmanPage, registerChairman, loginevalute, addNotice, addNoticeContent, getNotice, editNotice, updateNotice, deleteNotice, addMemberpage, addMember, logout, addNoticeApi, singlepage, uploadsingleimage, displayIMage } = require("../../controllers/chairmanController");

const auth = require("../../middleware/auth")
const routes = express.Router() 

const multer = require("multer")

routes.get("/",login)
routes.get("/login",login)
routes.get("/logout",logout)
routes.get("/home",auth,homepage)
routes.get("/register-page",registerChairmanPage)
routes.post("/register",registerChairman)
routes.post("/login-evalute",loginevalute)
routes.get("/addNotice",auth,addNotice)
routes.post("/addNoticeContent",addNoticeContent)
routes.post("/addNoticeApi",addNoticeApi)
routes.get("/allNotice",getNotice)
routes.get("/editNotice/:id",editNotice)
routes.post("/updateNotice",updateNotice)
routes.get("/deleteNotice/:id",deleteNotice)
routes.get("/addMemberpage",addMemberpage)
routes.post("/addMember",addMember)


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })


routes.get("/singlepage",singlepage)
routes.post("/uploadsingleimage",upload.single("img"),uploadsingleimage)
routes.get("/displayIMage",displayIMage)
module.exports = routes;