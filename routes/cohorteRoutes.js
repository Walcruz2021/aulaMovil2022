const express=require("express")
const Cohorte=require("../database/models/cohorte")
const Teacher = require('../database/models/teacher');
const Materia = require('../database/models/materia');
const router=express.Router()
const {getCohorte,addCohorte}=require("../controllers/cohorte.controller")
const {validateCohorte}=require("../validators/cohorte")

router.post("/addCohorte",validateCohorte,addCohorte)
    

router.get("/getCohorte",getCohorte)



module.exports=router