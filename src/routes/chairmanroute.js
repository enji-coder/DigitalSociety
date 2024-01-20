const express = require("express");
const { homepage, login, registerChairmanPage, registerChairman, loginevalute, addNotice, addNoticeContent, getNotice, editNotice, updateNotice, deleteNotice, addMemberpage, addMember, logout } = require("../../controllers/chairmanController");

const auth = require("../../middleware/auth")
const routes = express.Router() 

routes.get("/",login)
routes.get("/login",login)
routes.get("/logout",logout)
routes.get("/home",auth,homepage)
routes.get("/register-page",registerChairmanPage)
routes.post("/register",registerChairman)
routes.post("/login-evalute",loginevalute)
routes.get("/addNotice",auth,addNotice)
routes.post("/addNoticeContent",addNoticeContent)
routes.get("/allNotice",auth,getNotice)
routes.get("/editNotice/:id",editNotice)
routes.post("/updateNotice",updateNotice)
routes.get("/deleteNotice/:id",deleteNotice)
routes.get("/addMemberpage",addMemberpage)
routes.post("/addMember",addMember)
module.exports = routes;