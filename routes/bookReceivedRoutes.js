const express = require('express');
const { BookReceived } = require('../models/BookReceived');
const app = express.Router();

app.get('/book-Received-entry/class/:number', function(req,res){
    let number = req.params.number;
    number++;
    let ClassNumber = number;
    res.render('bookReceivedEntry', {ClassNumber:ClassNumber});
})

app.post('/book-Received-entry/class/:number', async function(req,res){
   const data = req.body;
   const newBookReceived = new BookReceived(data);
   await newBookReceived.save();
})



app.get("/bookReceivedInformation", function(req,res){
    const Classes  = [1,2,3,4,5];
    res.render('bookReceivedInformation', {Classes:Classes});
  })


  app.get('/getAllBookReceivedData', async function(req,res){
  
    const data = req.query; 
 
   try{
    const distributionInformation = await BookReceived.find(data).exec();
    console.log(distributionInformation);
    // // console.log('data:');
    // // console.log(distributionInformation);
    
    // const transformedData = await Promise.all(distributionInformation.map(async function(doc) {
    //     const obj = doc.toObject();
        
        
    //     const { studentID, __v, ...rest } = obj;
    //    // console.log(studentID);
    //     const studentInfo = await Student.find({_id: studentID}).exec();
    //     //console.log(studentInfo);
    //     const firstName =  studentInfo[0].firstName;
    //     const secondName = studentInfo[0].secondName;
       
      
    //     rest.fullName = firstName + " " + secondName; // Add fullname to the object
    //     return rest;
    // }));
    

        res.status(201).json(distributionInformation);
   }
   catch(error){
       console.log(error);
   }
  
 });


module.exports =   app
