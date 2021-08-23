const express = require("express");
const userModel = require("./../database/model/user");
const bcrypt = require("bcrypt");

const route = express.Router();

route.post("/register",async (req, res)=>{
    const validateData = userModel.insertValidator(req.body);
    console.log(validateData)
    if (validateData.error){
        return res.status(400).send(validateData.error.details);
    }
    const slat = await bcrypt.genSalt(10);
    validateData.value.password = await bcrypt.hash(validateData.value.password,slat);
    let user = new userModel(validateData.value);
    try{
        user = await user.save();
        res.send(user);
    }catch (e) {
        console.log(e);
        return res.status(400).send(e);
    }
});

module.exports = route;