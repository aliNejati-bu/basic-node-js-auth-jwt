const mongoose = require("mongoose");

module.exports = {
    connect: URI => {
        return mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true});
    }
};