const mongoose = require("mongoose");
const Joi = require("joi")

module.exports = mongoose.model("user",mongoose.Schema({
    username:String,
    email:String,
    password:String,
    roles:[String]
}));

module.exports.insertValidator = INPUT =>{
    const schema = Joi.object({
        username:Joi.string().min(2).max(255),
        email:Joi.string().min(5).max(255),
        password:Joi.string().min(8).max(255),
    });

    return schema.validate(INPUT);
};



