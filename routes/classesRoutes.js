const express = require("express");
const router = express.Router();
const validateFields = require("../helpers/validateFields");
const { check } = require("express-validator");
const ClassesController = require("../controllers/classes.controller");

router.get("/", ClassesController.getAllClasses);
router.get("/:id", ClassesController.getClassesById);
router.get("/?=", ClassesController.queryOptions);

router.post("/signup", ClassesController.newClasses);
router.post("/signin", ClassesController.loginClasses);

router.patch("/:id", ClassesController.updateClasses);

router.delete("/:id", ClassesController.deleteClasses);

module.exports = router;
