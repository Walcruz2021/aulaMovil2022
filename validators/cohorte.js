const {check}=require("express-validator")
const { validateFields } = require("../helpers/validateFields");


const validateCohorte=[
    check("name")
    .exists()
    .not()
    .isEmpty(),
    (req,res,next)=>{
        validateFields(req,res,next)
    }
]

module.exports={validateCohorte}