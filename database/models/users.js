//libreria que nos permitira conectarse a mongodb
const bcrypt = require("bcrypt-nodejs")
const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    username: { type: String, require: true },
    password: { type: String, require: true }
});

// userSchema.methods.encryptPassword = (password) => {
//     //valor en la que queremos que se cifre el algporitmo
//     //m ientras mas veces mas seguro 
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
// }

// //funcion que compara los password
// userSchema.methods.comparePassword = function (password) {
//     return bcrypt.compareSync(password, this.password);
// }

module.exports = mongoose.model('Users', userSchema);
