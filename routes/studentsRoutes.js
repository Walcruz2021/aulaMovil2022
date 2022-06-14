const express = require("express");
const router = express.Router();
const validateFields = require("../helpers/validateFields");
const { check } = require("express-validator");
const StudentController = require("../controllers/students.controller");

router.get("/", StudentController.getAllStudents);
router.get("/:id", StudentController.getStudentById);
router.get("/?=", StudentController.queryOptions);

// router.post(
//   "/signup",
//   [
//     check("DNI", "no points or commas added").not().isEmpty().isInt(),
//     check("fullname", "name can not be empty").not().isEmpty().isString(),
//     check("email", "It must be a valid email")
//       .not()
//       .isEmpty()
//       .isEmail()
//       .normalizeEmail(),
//     check("password", "password can not be empty")
//       .not()
//       .isEmpty(),
//       .isLength({ min:8, max:16 }),
//       .isStrongPassword(),
//     validateFields,
//   ],
//   StudentController.newStudent
// );

router.post(
  "/signin",
  [
    check("email", "It must be a valid email").not().isEmpty().isEmail(),
    check("password", "password can not be empty").not().isEmpty(),
    validateFields,
  ],
  StudentController.loginStudent
);

router.patch("/:id", StudentController.updateStudent);

router.delete("/:id", StudentController.deleteUser);

module.exports = router;
