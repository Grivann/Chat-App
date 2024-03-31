const express = require("express");
const app=express();
const mongoose= require("mongoose");
const Chat= require("/Users/Hp/OneDrive/Desktop/Code/WebD/Backend/MongoDB3/models/chat.js");
const path=require("path");
const methodOverride = require('method-override');

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('_method'));
app.set("views",path.join(__dirname, "views"));
app.set("views engine", "ejs");
// app.use(express.static(path.join(__dirname,"public")))
app.use('/chats', express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({extended:true}));

main()
.then(() => {
    console.log("connection succesful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.get( "/chats", async(req,res) => {
    let chats= await Chat.find();
    console.log(chats);
    res.render("index.ejs", {chats}); 
});
app.get( "/chats/new", async(req,res) => {
    res.render("new.ejs"); 
});

app.put( "/chats/:id", async(req,res) => {
    let {id}=req.params;
    let {msg : newMsg}=req.body;
    console.log(newMsg);
    let updatedMsg= await Chat.findByIdAndUpdate( id, {msg: newMsg}, {runValidators: true, new: true});
    res.redirect("/chats"); 
});

app.delete( "/chats/:id", async(req,res) => {
    let {id}=req.params;
    let deletedMsg= await Chat.findByIdAndDelete( id);
    res.redirect("/chats"); 
});

app.get( "/chats/:id/edit", async(req,res) => {
    let {id}=req.params; 
    let chat= await Chat.findById(id)
    res.render("edit.ejs", {chat}); 
});

app.get( "/", (req,res) => {
    res.send("Hello"); 
});

app.post("/chats", (req,res) =>{
    let {from, message ,to}= req.body;
    let newChat= new Chat({
        from : from,
        msg: message,
        to: to,
        time: new Date(),
    });
    newChat.save()
    .then( () => console.log("working"))
    .catch(err=> console.log(err));
    res.redirect("/chats");
});

app.listen(8080, ()=> {
    console.log("port is listening")
});

