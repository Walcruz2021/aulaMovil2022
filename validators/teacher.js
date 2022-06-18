const { check } = require("express-validator")
const { validateFields } = require("../helpers/validateFields")

const validateCreate = [
    check("firstName")
        .exists()
        .not()
        .isEmpty(),

    check("lastName")
        .exists()
        .not()
        .isEmpty(),
    check("dni")
        .exists()
        .not()
        .isEmpty()
        .isNumeric(),
    check("address")
        .exists()
        .not()
        .isEmpty(),
    check("country")
        .exists()
        .not()
        .isEmpty(),
    check("province")
        .exists()
        .not()
        .isEmpty(),
    // check("email")
    //     .exists()
    //     .not()
    //     .isEmpty()
    //     .isEmail(),
    check("phone")
        .exists()
        .not()
        .isEmpty()
        .isNumeric(),
    check("status")
        .exists()
        .not()
        .isEmpty()
        .isBoolean(),
        (req, res, next) => {
    validateFields(req, res, next)
}
]

module.exports = { validateCreate }