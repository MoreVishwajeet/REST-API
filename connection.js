const mongoose = require("mongoose");

async function connectMongoDb(dbUrl) {
//Mongodb Connection
    return mongoose.connect(dbUrl)
            .then(() => console.log("MongoDB Connected"))
            .catch(err => console.log('Mongo Error : ', err));
};

module.exports = {
    connectMongoDb,
};