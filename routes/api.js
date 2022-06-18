const express = require('express');
const Teacher = require('../database/models/teacher');
const Materia = require('../database/models/materia');
const Cohorte = require("../database/models/cohorte")
const router = express.Router();

const User = require('../database/models/users')


router.get('/getTurnos', async (req, res) => {
    const turnos = await User.find();
    console.log("turnos")
    //res.send("hola mundo")
    res.json({
        turnos: turnos
    })
})

router.post("/turno", async (req, res, next) => {
    const { name } = req.body;
    const user = new User({
        name: name
    })
    try {

        await user.save();

        res.send(user)
        res.json({
            status: "user agendado"
        })
    }
    catch (err) {
        next(err);
    }
});




module.exports = router;