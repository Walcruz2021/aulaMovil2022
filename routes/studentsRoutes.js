const express = require("express");
const router = express.Router();
const validateFields = require("../helpers/validateFields");
//const {verifyToken}=require("../validators/verifyToken")
const{verify}=require("../validators/verify")
var jwt = require("jsonwebtoken");
const passport = require("passport");
require("../passportConfig")(passport);
const Students = require("../database/models/students");
const bcrypt = require("bcryptjs");
const {addStudents,getStudents,getStudentsId,addMateriaStu,editStudents, uploadAvatar}=require("../controllers/students.controller")
const upload = require('../middlewares/uploadAvatar')

router.post("/addStudents",addStudents);
router.get("/getStudents",getStudents);
router.get("/getStudent/:id",getStudentsId)
router.post("/addMateriaStu/:id",addMateriaStu)
router.put("/editStudents/:id",editStudents)
router.put("/editAvatar/:id", upload.single('avatar') ,uploadAvatar)


// Routes STUDENTS
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) throw err;
      console.log(user)
      if (!user) res.status(204).send("No User Exists");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          let data ={
            id : user._id
          }
          if (err) throw err;
            function generateAccessToken(user) {
              return jwt.sign(data, "secret",{expiresIn:"60s"})
            }
          const accessToken = generateAccessToken(user)
          res.status(200).json({
            msg : "Successfully Authenticated",
            token : accessToken,
            user : req.user
          });
          //console.log(req.user);
        });
      }
    })(req, res, next);
  });
  
  router.post("/register", (req, res) => {
    Students.findOne({ username: req.body.username }, async (err, doc) => {
      if (err) throw err;
      if (doc) res.status(204).send("User Already Exists");
      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
  
        const newUser = new Students({
          username: req.body.username,
          password: hashedPassword,
        });
        await newUser.save();
        res.status(200).send("User Created");
      }
    });
  });
  
  router.put("/editUser/:idStudent", async (req, res,next) => {

    const id=req.params.idStudent
    console.log(id)
    const userId=await Students.findById(id)
    if(userId){
      Students.findOne({ username: req.body.username }, async (err, user) => {
        if (err) throw err;
        if (user) {
          if(user!==req.body.username2){
            Students.findOne({ username2: req.body.username2 }, async (err, user2) => {
              if(!user2){
                bcrypt.compare(req.body.password, user.password, async (err, result) => {
                  if (err) throw err;
                  if (result === true) {
                        //res.status(200).send("contraseña validada")
                        const hashedPassword = await bcrypt.hash(req.body.password2, 10);
                        const newUser = ({
                          username: req.body.username2,
                          password: hashedPassword,
                        });
                          await Students.findByIdAndUpdate(id,newUser,{ userFindModify: false })
                          res.status(200).send(
                          "estudiante actualizado"
                          )
                  }else res.status(204).send("contraseña invalida")
                })
              } else res.status(204).send("nuevo ususario ya existe")
            })
          }else   bcrypt.compare(req.body.password, user.password, async (err, result) => {
            if (err) throw err;
            if (result === true) {
                  //res.status(200).send("contraseña validada")
                  const hashedPassword = await bcrypt.hash(req.body.password2, 10);
                  const newUser = ({
                    username: req.body.username2,
                    password: hashedPassword,
                  });
                    await Students.findByIdAndUpdate(id,newUser,{ userFindModify: false })
                    res.status(200).send(
                    "estudiante actualizado"
                    )
            }else res.status(204).send("contraseña invalida")
          })
          
        }else res.status(204).send("ususario no existente")   
      })
    } else res.status(204).send("ususario o id inexistente")
  })

  
module.exports = router;