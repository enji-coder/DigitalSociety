const express = require("express")
const hbs = require("hbs")
const app = express() 
const axios = require("axios")
const cookieParser = require('cookie-parser'); 
// for db connection 
const mongoose = require("mongoose")
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())


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

/*  
    api calling part ------------
*/

// axios.get("https://fakestoreapi.com/products")
//     .then(function(response){
//         console.log("---> response",response);
        
//     })
//     .catch(function(error){
//         console.log("--> Error",error);
//     })
    

// axios.get("https://fakestoreapi.com/products/1")
//     .then((res)=>{
//         console.log(res);
//     })
//     .catch((e)=>{
//         console.log(e);
//     })

app.get("/getProducts",(req,res)=>{
    axios.get("https://fakestoreapi.com/products")
    .then((response)=>{
        res.send(response.data)
        // res.send(response.data)
    })
    .catch((e)=>{
        res.send(e)
    })
})

app.get("/getProduct",(req,res)=>{
    axios.get("https://fakestoreapi.com/products/1")
    .then((response)=>{
        res.send(response.data)
    })
    .catch((e)=>{
        res.send(e)
    })
})
app.get("/myData",(req,res)=>{
    axios.get("https://reqres.in/api/unknown")
    .then((response)=>{
        //res.send(response.data)
        res.send(response.data.data[0].name)
    })
    .catch((e)=>{
        res.send(e)
    })
})
app.get("/create",(req,res)=>{
    axios.post("https://reqres.in/api/users",{
            "name": "Anjali",
            "job": "Nodejs"
        }).then((response)=>{
            res.send(response.data)
        }).catch((e)=>{
            res.send(e)
        })
})
app.get("/updateData",(req,res)=>{
    axios.put("https://reqres.in/api/users/2",{
        "name": "AAAA",
        "job": "sssss"
    }).then((response)=>{
        res.send(response.data)
    }).catch((e)=>{
        res.send(e)
    })
})
app.get("/deleteData",(req,res)=>{
    axios.delete("https://reqres.in/api/users/2").then((response)=>{
        res.send(response.data)
    }).catch((e)=>{
        res.send(e)
    })
})
app.listen(process.env.PORT,()=>{
    console.log("server connected");
})