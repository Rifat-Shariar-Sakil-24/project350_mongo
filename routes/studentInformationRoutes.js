const express = require('express');
const { Student } = require('../models/Student');
const { BookDistribution } = require('../models/BookDistribution');
const { getUserID } = require('../middleware/userID');
const app = express.Router();

app.get("/student-entry/class/:number", async function(req,res){
    
    let number = req.params.number;
    number++;
    let ClassNumber = number;
    res.render('studentEntry', {ClassNumber:ClassNumber});
})
app.post("/student-entry/class/:number", async function(req,res){
    const schoolID = await getUserID(req);
    //console.log(schoolId);
    const data = req.body; 
    data.schoolID = schoolID;
    
    
    let number = req.params.number;
    number++;
    try{
        const student = new Student(data);
      await student.save();
      res.sendStatus(201).send(number);
    }
      catch(err){
          res.sendStatus(401).send(err);
      }
    
  })
  app.put("/student-entry/class/:number", async function(req, res) {
    const data = req.body;
     const schoolID = await getUserID(req);
   
    const conditions = {
        classNumber: data.classNumber,
        rollNumber: data.rollNumber,
        yearNumber: data.yearNumber,
        schoolID : schoolID
    };


    try {
        const updatedStudent = await Student.findOneAndUpdate(conditions, data, { new: true });
        res.status(201).send('Student edited successfully');
    } catch (error) {
        res.status(401).send(error);
    }
});


app.delete("/student-entry/class/:number", async function(req, res) {
    const conditions = req.body;
    const schoolID = await getUserID(req);
    conditions.schoolID =  schoolID;
    console.log(conditions);

    try {
        await BookDistribution.findOneAndDelete(conditions);
        try {
            await Student.findOneAndDelete(conditions);
            res.status(201).send('student deleted successfully');
        } catch (error) {
            res.status(401).send(error);
        }
    } catch (error) {
        res.status(401).send(error);
    }

    
   
});
 
 


app.get('/getStudentData', async function(req,res){
    const schoolID = await getUserID(req);
    // console.log(schoolId);
    // const data = req.body; 
    // data.schoolID = schoolId;
    const { classNo, roll, year } = req.query; // Use req.query to get query parameters
   // console.log("called");
 
    try{
        const found = await Student.findOne({ 
            schoolID : schoolID,
            classNumber: classNo,
            rollNumber: roll,
            yearNumber: year,
        }).exec();
        if(found==null) res.status(401).send("student already exists");
        else res.status(201).send("No such student found");
    }
    catch(error){
        console.log(error);
    }
  
  });




app.get("/studentInformation", function(req,res){
  const Classes  = [1,2,3,4,5];
  res.render('studentInformation', {Classes:Classes});
})

app.get('/getAllStudentData', async function(req,res){
  
   const data = req.query; 
   const schoolID = await getUserID(req);
   data.schoolID =  schoolID;

  try{
         const studentInformation = await Student.find(data).exec();
      res.status(201).json(studentInformation);
  }
  catch(error){
      console.log(error);
  }
 
});


module.exports =   app
