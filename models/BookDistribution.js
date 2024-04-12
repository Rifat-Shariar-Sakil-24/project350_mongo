const mongoose = require('mongoose');
const BookDistributionSchema = new mongoose.Schema({
    studentID: {
        type: String,
        unique: true
    },
    classNumber: Number,
    rollNumber: Number,
    yearNumber: Number,
    subjects: {
        bangla: Boolean,
        english: Boolean,
        math: Boolean,
        science: Boolean,
        socialscience: Boolean,
        religion:Boolean
    }
  });
  const BookDistribution = mongoose.model('bookDistribution', BookDistributionSchema);

  module.exports = {
    BookDistribution
  }