const express = require("express");
const app = express();
require("dotenv").config();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 

// const MONGO_URI = process.env.MONGO_URI;
// mongoose
// .connect(MONGO_URI,{ useNewUrlParser: true}).then(()=> console.log("Mngo connection success")).catch(err => console.log("err"));


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://basicdb:basicdb123@basic.wzpeb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
mongoose
.connect(uri,{ useNewUrlParser: true , useUnifiedTopology: true }).then(()=> console.log("Mongo connection success")).catch(err => console.log("err"));




app.get("/", (req,res) => {
    res.send("hello");
});

app.listen(PORT,() => {
    console.log(`Server is running successfully on ${PORT}`)
});

app.post("/user",(req,res) => {
    console.log("req.body");
    res.send(req.body);
})