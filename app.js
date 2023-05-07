const express = require('express')
const app = express()
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require("path");
const mongoose = require('mongoose');


//Starting mongoose
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/purufitness');
}

const fitnessSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Fitness = mongoose.model('Fitness', fitnessSchema);
//Setting up static files
app.use(express.static('public'));


//Setting up PORT with dotenv
dotenv.config({path:"process.env"})
const PORT = process.env.PORT || 3000;

//setting up bodyparser
app.use(bodyParser.urlencoded({ extended: true }));


//Setting up ejs
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

//Endpoints
app.get('/', (req, res) => {
  res.render("index");
})

app.get("/contact",(req,res)=>{
  res.render("contact");
})

app.get("/about",(req,res)=>{
  res.render("about");
})

app.get("/pricing",(req,res)=>{
  res.render("pricing");
})

app.post('/contact', (req, res) => {
  const newFitness = new Fitness({
    name: req.body.name,
    email: req.body.email,
    message: req.body.message,
  });


newFitness.save();
})


//Listening to the port
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
})