const express = require("express");
const userModel = require("./../database/model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const fullUserMiddleware = require("./../middlewares/fullUser");

const route = express.Router();


route.post("/register", async (req, res) => {
    const validateData = userModel.insertValidator(req.body);
    console.log(validateData)
    if (validateData.error) {
        return res.status(400).send(validateData.error.details);
    }
    const slat = await bcrypt.genSalt(10);
    validateData.value.password = await bcrypt.hash(validateData.value.password, slat);
    let user = new userModel(validateData.value);
    try {
        user = await user.save();
        user = user.toObject();
        delete user.password;
        res.send(user);
    } catch (e) {
        console.log(e);
        return res.status(400).send(e);
    }
});

route.post("/auth", async (req, res) => {
    const validateData = userModel.authValidator(req.body);
    if (validateData.error) {
        return res.status(400).send(validateData.error.details);
    }
    let user = await userModel.findOne({email: validateData.value.email});
    console.log(user);
    if (!user) {
        return res.status(403).send({status: false, error: "user and password does not mach."})
    }

    const verifyPassword = await bcrypt.compare(validateData.value.password, user.password);
    if (!verifyPassword) {
        return res.status(403).send({status: false, error: "user and password does not mach."})
    }

    const secretKey = config.get("secret");

    const jwtToken = jwt.sign({
        username: user.username,
        email: user.email,
        roll: user.roles
    }, secretKey);

    return res.set({"X-Auth-Token": jwtToken}).send({status: true, jwtToken});

});


route.post("/addRoll", fullUserMiddleware,async (req, res) => {
    const validateData = userModel.addRollValidator(req.body);
    if (validateData.error) {
        return res.status(400).send(validateData.error.details);
    }


    let user = await userModel.findOneAndUpdate({email:validateData.value.email},{$push:{roles:validateData.value.roll}},{new:1});
    if (!user){
        return res.status(400).send("user not found.");
    }
    return res.send(user);
});

module.exports = route;