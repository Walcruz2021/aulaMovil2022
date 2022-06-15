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
    const { name, idteacher,dateIni,dateFin } = req.body

    try {
        //const teacher = await Teacher.findById(idteacher)
        //const materia = await Materia.findById(idmateria)

        //const nameTeacher = teacher.firstName

        const cohorte = new Cohorte({
            name: name,
            //materias: Materia.materias.push(materia)
            dateIni:dateIni,
            dateFin:dateFin
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

const addMatCohorte = async (req, res, next) => {

    const { idMateria } = req.body

    const materia = await Materia.findById(idMateria)
    console.log(materia)
    const cohorte = await Cohorte.findById(req.params.idCohorte)
    cohorte.materias.push(materia)
    await cohorte.save()
    try {
        res.status(200).json({
            msg: "materia añadida"
        })
    } catch (err) {
        next(err)
    }
    await cohorte.save()

}

const getCohorteId = async (req, res, next) => {

    try {
        await Cohorte.findById(req.params.idCohorte, {}, function (err, cohortes) {
            Materia.populate(cohortes, { path: "materias" }, function (err, cohortes) {
                res.status(200).json({
                    cohortes: cohortes
                })
            })
        })

    } catch (err) {
        next(err)
    }
}

module.exports = {
    getCohorte,
    addCohorte,
    addMatCohorte,
    getCohorteId
}