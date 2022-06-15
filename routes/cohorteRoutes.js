const express=require("express")
const Cohorte=require("../database/models/cohorte")
const Teacher = require('../database/models/teacher');
const Materia = require('../database/models/materia');
const router=express.Router()
const {getCohorte,addCohorte,addMatCohorte,getCohorteId}=require("../controllers/cohorte.controller")
const {validateCohorte}=require("../validators/cohorte")

router.post("/addCohorte",validateCohorte,addCohorte)
router.post("/addMatCohorte/:idCohorte",addMatCohorte)    
router.get("/getCohorte/",getCohorte)
router.get("/getCohorteId/:idCohorte",getCohorteId)



module.exports=router