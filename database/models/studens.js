const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const StudentSchema = new Schema({
    DNI: {
        type: Number,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    address: {
        street: String,
        city: String,
        province: String,
        country: String,
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 16
    },
    image: String,
    roleId: {
        type: Object.SchemasTypes.Id,
        ref: "Role"
    },
    classesId: {
        [{
            type: Number,
            ref: "Class",
        }]
    
    },
})

module.exports = mongoose.model('student', StudentSchema);

