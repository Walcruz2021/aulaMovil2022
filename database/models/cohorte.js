const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const CohorteSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  // description: String,
  students: [
    {
      type: Object,
      ref: "student",
    },
  ],
  nameTeacher: {
    type: String
  },
  nameMateria:{
    type:Object
  },
  cantStudenst:{
    type: Number
  }
});

const cohorteModel = mongoose.model("Cohorte", CohorteSchema);

module.exports = cohorteModel;
