// jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");

// Express Use
const app = express();

// PORT
const PORT = process.env.PORT || 3000;

// Array
const items = ["Add below your new task"];

// EJS Template Engine setup
app.set("view engine", "ejs");

// Body-Parser Use
app.use(bodyParser.urlencoded({extended: true}));

// Order to Express to Load the CSS from Public folder
app.use(express.static(__dirname + "/public"));

// Route Setup
app.get("/", function(req, res){    
    let day = date.getDate();
    res.render("list", {kindOfDay: day, newListItems: items});
});

// Request of Text Item from EJS file
app.post("/", function(req, res){
    let item = req.body.newItem

    items.push(item);

    res.redirect("/");
})

// Running Server
app.listen(PORT, function(){
    console.log(`Server is running on port: ${PORT} `)
})