const mongoose = require("mongoose");
const Joi = require("joi")

module.exports = mongoose.model("user",mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true
    },
    password:String,
    roles:[String]
}));

module.exports.insertValidator = INPUT =>{
    const schema = Joi.object({
        username:Joi.string().min(2).max(255).required(),
        email:Joi.string().min(5).max(255).required(),
        password:Joi.string().min(8).max(255).required(),
    });

    return schema.validate(INPUT);
};

module.exports.authValidator = INPUT => {
    const schema = Joi.object({
        email:Joi.string().min(5).max(255).required(),
        password:Joi.string().min(8).max(255).required(),
    });

    return schema.validate(INPUT);
};


