const db = require("./database/connect");
const config = require("config");
const express = require("express");
const userRout = require("./router/user");


const app = express();

db.connect(config.get("db_url"))
    .then(()=>{console.log("connected to database...")})
    .catch(err => console.log(err));

app.use(express.json());



app.use("/api/user",userRout);


app.listen(
    config.get("port"),
    config.get("server"),
    ()=>{
        console.log("server started on : " + config.get("server")+ ":" + config.get("port"))
    });