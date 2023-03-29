const mongoose = require("mongoose");

const connectmongo = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/shopping", (err) => {
        if(err)console.log('error',err);
        else
        console.log("you are connected")
    })


};

module.exports = connectmongo;