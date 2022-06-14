const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const { Student } = require("./students");
const { Materia } = require("./materia");

const TaskSchema = new Schema({
  fechaEntregada: () => {
    return Date.now();
  },
  fechaFinalizacion: {
    type: Date,
    required: true,
  },
  student: {
    type: Object.SchemaTypes.Id,
    ref: "student",
    required: true,
  },
  grade: {
    type: Number,
    required: true,
  },
});

const taskModel = mongoose.model("task", TaskSchema);

module.exports = taskModel;
