const db = require("./database/connect");
const config = require("config");

db.connect(config.get("db_url"))
    .then(()=>{console.log("connected to database...")})
    .catch(err => console.log(err));
