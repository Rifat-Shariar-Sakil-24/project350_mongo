const mongoose = require('mongoose');
const express =require ('express');
const { Student } = require('../models/Student');
const { BookDistribution } = require('../models/BookDistribution');

const app = express.Router();

app.get('/book-distribution-entry/class/:number', function(req,res){
    let number = req.params.number;
    number++;
    let ClassNumber = number;
    res.render('bookDistributionEntry', {ClassNumber:ClassNumber});
})


app.post("/book-distribution-entry/class/:number", async function (req, res) {

    const studentInfo = await Student.findOne({ 
        classNumber: req.body.classNumber,
        rollNumber: req.body.rollNumber,
        yearNumber: req.body.yearNumber,
    }).exec();

    //console.log(studentInfo._id);
    
    const studentID = studentInfo._id;


  const transformedData = {
    studentID : studentID,
    classNumber: parseInt(req.body.classNumber),
    rollNumber: parseInt(req.body.rollNumber),
    yearNumber: parseInt(req.body.yearNumber),
    subjects: {
      bangla: req.body.bangla,
      english: req.body.english,
      math: req.body.math,
      science: req.body.science,
      socialscience: req.body.socialscience,
      religion: req.body.religion,
    },
  };

//   console.log(transformedData);
  try {
    const newBookDistribution = new BookDistribution(transformedData);
    await newBookDistribution.save();
    res.status(201).send('book distribution added');
    
  } catch (error) {
    console.log(error);
    res.status(401).send("Book Distribution for this student already exists");
  }
});


app.put("/book-distribution-entry/class/:number", async function (req, res) {
   // console.log(req.body);

    const studentInfo = await Student.findOne({ 
        classNumber: req.body.classNumber,
        rollNumber: req.body.rollNumber,
        yearNumber: req.body.yearNumber,
    }).exec();

    //console.log(studentInfo._id);
    
    const studentID = studentInfo._id;


  const transformedData = {
    studentID : studentID,
    classNumber: parseInt(req.body.classNumber),
    rollNumber: parseInt(req.body.rollNumber),
    yearNumber: parseInt(req.body.yearNumber),
    subjects: {
      bangla: req.body.bangla,
      english: req.body.english,
      math: req.body.math,
      science: req.body.science,
      socialscience: req.body.socialscience,
      religion: req.body.religion,
    },
  };

//   console.log(transformedData);
 
try {
    const updatedDistribution = await BookDistribution.findOneAndUpdate({studentID: studentID}, transformedData, { new: true });
    res.status(201).send('Student edited successfully');
} catch (error) {
    console.log(error);
    res.status(401).send(error);
}
});

app.delete("/book-distribution-entry/class/:number", async function (req, res) {
  const conditions = req.body;

  try {
    await BookDistribution.findOneAndDelete(conditions);
    res.status(201).send("record deleted successfully");
  } catch (error) {
    res.status(401).send(error);
  }
});
 
 

app.get("/bookDistributionInformation", function(req,res){
    const Classes  = [1,2,3,4,5];
    res.render('bookDistributionInformation', {Classes:Classes});
  })


  app.get('/getAllDistributionData', async function(req,res){
  
    const data = req.query; 
 
   try{
    const distributionInformation = await BookDistribution.find(data).exec();
    // console.log('data:');
    // console.log(distributionInformation);
    
    const transformedData = await Promise.all(distributionInformation.map(async function(doc) {
        const obj = doc.toObject();
        
        
        const { studentID, __v, ...rest } = obj;
       // console.log(studentID);
        const studentInfo = await Student.find({_id: studentID}).exec();
        //console.log(studentInfo);
        const firstName =  studentInfo[0].firstName;
        const secondName = studentInfo[0].secondName;
       
      
        rest.fullName = firstName + " " + secondName; // Add fullname to the object
        return rest;
    }));
    

       res.status(201).json(transformedData);
   }
   catch(error){
       console.log(error);
   }
  
 });



 

 module.exports = app;