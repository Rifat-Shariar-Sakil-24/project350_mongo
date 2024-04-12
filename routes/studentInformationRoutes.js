const express = require('express');
const { Student } = require('../models/Student');
const { BookDistribution } = require('../models/BookDistribution');
const app = express.Router();

app.get("/student-entry/class/:number", async function(req,res){
    
    let number = req.params.number;
    number++;
    let ClassNumber = number;
    res.render('studentEntry', {ClassNumber:ClassNumber});
})
app.post("/student-entry/class/:number", async function(req,res){
   
    const data = req.body; 
    
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
    const conditions = {
        classNumber: data.classNumber,
        rollNumber: data.rollNumber,
        yearNumber: data.yearNumber,
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
    const { classNo, roll, year } = req.query; // Use req.query to get query parameters
    console.log("called");
 
    try{
        const found = await Student.findOne({ 
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

  try{
         const studentInformation = await Student.find(data).exec();
      res.status(201).json(studentInformation);
  }
  catch(error){
      console.log(error);
  }
 
});


module.exports =   app
