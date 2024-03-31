const mongoose = require("mongoose");
const Chat = require("/Users/Hp/OneDrive/Desktop/Code/WebD/Backend/MongoDB3/models/chat.js");

main()
    .then(() => {
        console.log("connection successful");
        insertData();
    })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

async function insertData() {
    const allChat = [
        {
            from: "Alice",
            to: "Michael",
            time: new Date(),
            msg: "Hello!"
        },
        {
            from: "David",
            to: "Sophia",
            time: new Date(),
            msg: "Nice to meet you!"
        },
        {
            from: "Emma",
            to: "John",
            time: new Date(),
            msg: "What's up?"
        },
        {
            from: "Bob",
            to: "Emily",
            time: new Date(),
            msg: "I'm doing great."
        },
        {
            from: "Oliver",
            to: "Ava",
            time: new Date(),
            msg: "See you later!"
        },
        {
            from: "Pankaj",
            to: "Grivann",
            time: new Date(),
            msg: "How are you?"
        },
        {
            from: "Sophia",
            to: "Alice",
            time: new Date(),
            msg: "Goodbye!"
        }
    ];

    try {
        const result = await Chat.insertMany(allChat);
        console.log("Documents inserted:", result);
    } catch (error) {
        console.error("Error inserting documents:", error);
    } finally {
        mongoose.disconnect();
    }
}
