const mongoose = require('mongoose');
const BookReceivedSchema = new mongoose.Schema({
    
    classNumber: {
        type: Number,
        required:true
    },
    yearNumber: {
        type: Number,
        required:true
    },
    date: {
        type: Date,
        required:true
    },
    subject: {
        type: String,
        required:true
    },
    bookNumber : {
        type: Number,
        required:true
    },
  });
  const BookReceived = mongoose.model('bookReceive', BookReceivedSchema);

  module.exports = {
    BookReceived
  }