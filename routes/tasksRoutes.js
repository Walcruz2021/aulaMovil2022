const express = require("express");
const router = express.Router();
const validateFields = require("../helpers/validateFields");
const { check } = require("express-validator");
const TasksController = require("../controllers/tasks.controller");

router.get("/", TasksController.getAllTasks);
router.get("/:id", TasksController.getTasksById);
router.get("/?=", TasksController.queryOptions);

router.post("/create", TasksController.newTasks);

router.patch("/:id", TasksController.updateTasks);

router.delete("/:id", TasksController.deleteTasks);

module.exports = router;
