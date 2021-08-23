const db = require("./database/connect");
const config = require("config");
const express = require("express");



const app = express();

db.connect(config.get("db_url"))
    .then(()=>{console.log("connected to database...")})
    .catch(err => console.log(err));


app.listen(
    config.get("port"),
    config.get("server"),
    ()=>{
        console.log("server started on : " + config.get("server")+ ":" + config.get("port"))
    });