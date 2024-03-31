const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    from : {
        type: String,
        require: true
    },
    msg : {
        type: String,
        minLength: 1
    },
    to : {
        type: String,
        require: true
    },
    time: {
        type: Date,
        require: true
    },
})

const Chat = mongoose.model("chat", chatSchema)
module.exports=Chat;