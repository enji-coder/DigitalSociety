const express = require("express");
const { homepage, login, registerChairmanPage, registerChairman, loginevalute, addNotice, addNoticeContent } = require("../../controllers/chairmanController");

const routes = express.Router() 

routes.get("/",login)
routes.get("/login",login)
routes.get("/home",homepage)
routes.get("/register-page",registerChairmanPage)
routes.post("/register",registerChairman)
routes.post("/login-evalute",loginevalute)
routes.get("/addNotice",addNotice)
routes.post("/addNoticeContent",addNoticeContent)
module.exports = routes;