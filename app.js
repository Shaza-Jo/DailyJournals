//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");

const app = express();
let composeDatas = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", (req, res)=>{
  res.render("home", {composeDatas:composeDatas});
});
app.get("/about", (req, res)=>{
  res.render("about", {})
});
app.get("/contact", (req, res)=>{
  res.render("contact", {})
});
app.get("/compose", (req, res)=>{
  res.render("compose", {})
});
app.post("/compose", (req, res)=>{
  let composeData = {
    title: req.body.textTitle,
    body: req.body.composeText
  };
  composeDatas.push(composeData);
  res.redirect("/");
});
app.get("/users/:title", (req, res)=>{
  composeDatas.forEach(data=>{
    let newTitle = data.title;
    let newPost = data.body;
    if ( _.lowerCase(newTitle) == _.lowerCase(req.params.title)){
        res.render("post", {newTitle:newTitle, newPost:newPost});
    }
  })
})












app.listen(3000, function() {
  console.log("Server started on port 3000");
});
