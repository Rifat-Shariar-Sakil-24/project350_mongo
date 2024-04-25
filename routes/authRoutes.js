const express = require('express');
const { School } = require('../models/School');
const app = express.Router();

app.get("/",function(req,res){
    res.render('home');
})


//login
app.get("/login", function(req,res){
    res.render('login');
})

app.get("/register", function(req,res){
    res.render('register');
})
app.post('/login',async function(req,res){
    const data = req.body;
    try {
        const existingSchool = await School.findOne({ email: data.email });
        if (!existingSchool) {
            return res.status(401).send('no such school found');
        }
        if(existingSchool.password!=data.password){
            return res.status(401).send('wrong password');
        }
        res.status(201).send('ok');
    } catch (error) {
        
    }
})
app.post('/register', async function(req, res){
    const data = req.body;
    try {
      
       const existingSchool = await School.findOne({ email: data.email });
       if (existingSchool) {
           return res.status(401).send('Email address already exists');
       }
       
       
       const newSchool = new School(data);
       await newSchool.save();
       res.status(201).send('New school registered'); 
    } catch (error) {
        console.log(error);
        res.status(500).send('Error occurred while saving your school'); 
    }
});

module.exports =   app
