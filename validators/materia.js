const{check}=require("express-validator")
const { validateFields } = require("../helpers/validateFields")


const validateMateria = [
    check("registro")
        .exists()
        .not()
        .isEmpty(),
    check("name")
        .exists()
        .not()
        .isEmpty(),

    check("campo")
        .exists()
        .not()
        .isEmpty(),

    check("name")
        .exists()
        .not()
        .isEmpty(),
        (req, res, next)=> {
    validateFields(req, res, next)
}
]

module.exports={validateMateria}