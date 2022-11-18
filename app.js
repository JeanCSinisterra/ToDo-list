// jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// Express Use
const app = express();

// MongoDB URI
const userName = 'jeancsinisterra';
const password = 'Nova25';
const uri = `mongodb+srv://${user}:${password}@cluster0.x3evpni.mongodb.net/?retryWrites=true&w=majority`;

// Mongoose Connection

mongoose.connect(uri, 
{ useNewUrlParser: true , useUnifiedTopology: true})
.then(() => console.log("DataBase Connected succesfully"))
.catch(e => console.log(e));

// Mongoose Schema
const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item ({
    name: "ToDo List for today"
});

const item2 = new Item({
    name: "Hit the button to add a new task"
});

const item3 = new Item({
    name: "<-- Hit this to delete an item"
});

const defaultItems = [item1, item2, item3];

Item.insertMany(defaultItems, function(err){
    if (err) {
        console.log(err);
    }
    else {
        console.log("Succesfuly saved default Items to database");
    }
})

// PORT
const PORT = process.env.PORT || 3000;

// EJS Template Engine setup
app.set("view engine", "ejs");

// Body-Parser Use
app.use(bodyParser.urlencoded({extended: true}));

// Order to Express to Load the CSS from Public folder
app.use(express.static(__dirname + "/public"));

// Route Setup
app.get("/", function(req, res){    
    res.render("list", {kindOfDay: "Today", newListItems: items});
});

// Request of Text Item from EJS file
app.post("/", function(req, res){
    let item = req.body.newItem

    items.push(item);

    res.redirect("/");
})

// connectDB();


// MongoDB URI entry point
// const uri = "mongodb+srv://jeancsinisterra:Pulsar2594@cluster0.x3evpni.mongodb.net/?retryWrites=true&w=majority";

// async function connectDB(){
//     try {
//         await mongoose.connectDB(uri)
//         console.log("Connected to MongoDB")
//     } catch (error) {
//         console.log(error);
//     }
// }   

// Running Server
app.listen(PORT, function() {
    console.log(`Server is running on port: ${PORT} `)
})