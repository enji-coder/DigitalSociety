const express = require("express")
const hbs = require("hbs")
const app = express() 

// for db connection 
const mongoose = require("mongoose")

app.use(express.urlencoded({extended:false}))

// declare public folder as a static 
app.use("/static/",express.static("public"))

// configure hbs as a view engine and declare views as a views 
app.set("view engine","hbs")
app.set("views","views")
hbs.registerPartials("views/partials")

// routes import 
const chairmanroute = require("./routes/chairmanroute")
app.use("/chairman",chairmanroute);



// configuration file importing and getting port variable 
require("dotenv").config()

mongoose.connect(process.env.dburl).then(()=>{
    console.log("Connected");
})

app.listen(process.env.PORT,()=>{
    console.log("server connected");
})