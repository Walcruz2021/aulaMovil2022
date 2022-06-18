
const express = require('express');
const Teacher = require('../database/models/teacher');
const Materia = require('../database/models/materia');
const Cohorte = require("../database/models/cohorte")
const router = express.Router();
const {getTeacher,getTeacherId,editTeacher,addTeacher}=require("../controllers/teacher.controller")
const {validateCreate}=require("../validators/teacher")
const bcrypt = require("bcryptjs");
//require("../passportConfig2")(passport2);
const passport = require("passport");
const jwt = require('jsonwebtoken')
require("../passportConfig2")(passport);

router.put("/editTeacher/:id", editTeacher)

////////////////////////TEACHER//////////////////////////////
// solicita id de materia
router.post("/addTeacher/:id", validateCreate,addTeacher) 

router.get('/getTeacher', getTeacher)

router.get('/getTeacher/:id', getTeacherId)


// Routes TEACHER
router.post("/loginTeacher", async (req, res, next) => {
  const username=await Teacher.findOne({ username: req.body.username })
    if (!username) res.send("No User Exists");
    else {
       
          function generateAccessToken(username) {
            return jwt.sign(username.username, "secret")
          }
        const accessToken = generateAccessToken(username)
        
        res.status(200).json({
          msg : "Successfully Authenticated",
          token : accessToken,
          username : req.username
        });
    }
});

router.post("/registerTeacher", (req, res) => {
  Teacher.findOne({ username: req.body.username }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.send("User Already Exists");
    if (!doc) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new Teacher({
        username: req.body.username,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(200).json({
        msg : "User Created",
      });
    }
  });
});


module.exports = router;