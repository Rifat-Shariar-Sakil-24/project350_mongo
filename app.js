require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require('path');

// const homeRoutes = require('./routes/homeRoutes');
// const loginRoutes = require('./routes/loginRoutes');
// const registerRoutes = require('./routes/registerRoutes');
// const taskRoutes = require('./routes/taskRoutes');
// const { isAuthenticated } = require('./middleware/authMiddleware');

const app = express();
app.use(express.static("public"));
//app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

//app.use(express.static(path.join(__dirname, 'public')));


const url = 'mongodb+srv://'+process.env.CLUSTERUSERNAME+':'+process.env.CLUSTERUSERPASS+'@cluster0.qrtll88.mongodb.net/project350_mongo'

connectDB().then(() => {
    console.log("Connected to DB");
}).catch(err => console.log(err));

async function connectDB() {
    try {
        await mongoose.connect(url);   
    } 
    catch (error) {
        throw new Error('Error connecting to MongoDB: ' + error.message);
    }
    
}


// app.use(homeRoutes);
// app.use(loginRoutes);
// app.use(registerRoutes);
// app.use(taskRoutes);


// app.get('/logout',function(req,res){
//   res.cookie('jwt','', {maxAge:1});
//   res.redirect('/');
// })

const studentSchema = new mongoose.Schema({
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
//home
app.get("/",function(req,res){
    res.render('home');
})


//login
app.get("/login", function(req,res){
    res.render('login');
})

app.get("/menu", function (req, res) {
  // res.render('menu');
  const data = {
    people: ["প্রথম", "দ্বিতীয়", "তৃতীয়", "চতুর্থ", "পঞ্চম"],
  };
  res.render("menu", data);
});

app.get("/student-entry/class/:number", async function(req,res){
    //await Student.deleteMany({});
    let number = req.params.number;
    number++;
    console.log(number);
    let ClassNumber = number;
    // if(number==1) ClassNumber = "প্রথম";
    // else if(number==2) ClassNumber="দ্বিতীয়"
    // else if(number==3) ClassNumber = "তৃতীয়"
    // else if (number==4) ClassNumber = "চতুর্থ"
    // else ClassNumber = "পঞ্চম"
    res.render('studentEntry', {ClassNumber:ClassNumber});
})
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
   // console.log(req.query);
  });

app.post("/student-entry/class/:number", function(req,res){
  console.log(req.body);
  const data = req.body; 
  const student = new Student(data);
  let number = req.params.number;
  number++;
  try{
    student.save();
    res.sendStatus(201).send(number);
  }
    catch(err){
        res.sendStatus(401).send(err);
    }
  
})

app.listen(process.env.PORT || 4000,function(){
    console.log("server is running on port 4000");
})


