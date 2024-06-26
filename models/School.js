const mongoose = require("mongoose");

const schoolSchema = new mongoose.Schema({
  schoolname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const School = mongoose.model("school", schoolSchema);

module.exports = {
  School,
};
