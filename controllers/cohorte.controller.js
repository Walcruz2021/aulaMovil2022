const express = require('express');
const Cohorte = require('../database/models/cohorte')
const Teacher = require('../database/models/teacher');
const Materia = require('../database/models/materia');

const getCohorte = async (req, res) => {

    const cohorte = await Cohorte.find()
    res.json({
        cohorte: cohorte
    })



}

const addCohorte = async (req, res) => {
    const { name, idteacher, idmateria } = req.body

    try {
        const teacher = await Teacher.findById(idteacher)
        const materia = await Materia.findById(idmateria)

        const nameTeacher = teacher.firstName
        const nameMateria = materia.name

        const cohorte = new Cohorte({
            name: name,
            nameMateria: nameMateria,
            nameTeacher: nameTeacher
        })

        await cohorte.save()
        res.send(cohorte)
        res.json({
            status: "cohorte creado"
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    getCohorte,
    addCohorte
}