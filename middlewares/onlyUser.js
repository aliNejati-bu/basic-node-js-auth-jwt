const jwt = require("jsonwebtoken");
const config = require("config");

const secretKey = config.get("secret");

module.exports = (req, res, next) => {

    const token = req.header("x-auth-token");
    if (!token) {
        return res.status(401).send("401 Unauthorized");
    }

    const user = jwt.verify(token,secretKey);
    if (!user) {
        return res.status(401).send("401 Unauthorized");
    }

    req.user = user;

    next();


}