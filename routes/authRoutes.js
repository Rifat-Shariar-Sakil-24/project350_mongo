const express = require('express');
const { School } = require('../models/School');
const app = express.Router();


const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

const maxAge = 3*24*60*60;
const createToken = function(id){
    return jwt.sign({id}, secret, {
        expiresIn: maxAge
    });
}

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
        const token = createToken(existingSchool._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        })
        
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

       const token = createToken(newSchool._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: maxAge * 1000
        })
       res.status(201).send('New school registered'); 
    } catch (error) {
        console.log(error);
        res.status(500).send('Error occurred while saving your school'); 
    }
});

module.exports =   app
