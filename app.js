const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");

mongoose.connect('mongodb://localhost:27017/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});
const port = 80;

// Define moongose schema 
const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    contactno: String,
    email: String,
    address: String,
    more: String
  });

  const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));   // For serving static files
app.use(express.urlencoded());  // bring the data of the form to express

// PUG SPECIFIC STUFF
app.set('view engine', 'pug');  // Set the template engine as pug
app.set('views', path.join(__dirname, 'views'));    // Set the views directory

// ENDPOINTS
app.get('/', (req, res)=>{
    const par = {};
    res.status(200).render('home.pug', par);
});

app.get('/contact', (req, res)=>{
    const par = {};
    res.status(200).render('contact.pug', par);
});

app.post('/contact', (req, res)=>{
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been send to the database.");
    }).catch(()=>{
        res.status(400).send("The item was not saved to the database.")
    });

    // res.status(200).render('contact.pug');
});

// STARTING THE SERVER
app.listen(port, ()=>{
    console.log(`This application started successfully on port ${port}`);
});
