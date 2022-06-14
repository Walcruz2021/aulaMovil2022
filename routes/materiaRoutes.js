const express=require("express")
const Materia=require("../database/models/materia")
const Teacher = require('../database/models/teacher');
const router=express.Router()
const {addMateria,getMateria,editMateria}=require("../controllers/materia.controller")
const {validateMateria}=require("../validators/materia")

/////////////////////////MATERIA//////////////////////////////
router.get('/getMateria', getMateria )

router.put("/editMateria/:id", editMateria)

router.post('/addMateria', validateMateria,addMateria)

module.exports=router