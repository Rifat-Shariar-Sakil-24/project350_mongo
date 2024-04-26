const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  schoolID:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'School' ,
    required : true,     
  },
    classNumber: Number,
    firstName: String,
    secondName: String,
    rollNumber: Number,
    yearNumber: Number,
    fatherName: String,
    motherName: String,
    phoneNumber: String,
    address: String,
    description: String
  });
  const Student = mongoose.model('student', studentSchema);

  module.exports = {
    Student
  }