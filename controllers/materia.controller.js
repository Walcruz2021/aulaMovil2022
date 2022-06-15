const express = require("express")
const Materia = require('../database/models/materia');
const Teacher = require('../database/models/teacher');

const addMateria = async (req, res, next) => {

    const { registro, name, campo } = req.body
    const materia = new Materia({
        registro: registro,
        name: name,
        campo: campo
    })

    materia.save()
    res.json({
        status: "materia creada"
    })
}

const getMateria = async (req, res) => {

    try {
        await Materia.find({}, function (err, materias) {
            Teacher.populate(materias, { path: "teachers" }, function (err, materias) {
                res.json({
                    materias: materias
                })
            })
        })
    } catch (err) {
        console.log(err)
    }
}

const editMateria = async (req, res, next) => {
    const { registro, name, campo } = req.body
    const newMateria = {
        registro: registro,
        name: name,
        campo: campo
    }
    try {
        await Materia.findByIdAndUpdate(req.params.id, newMateria, { userFindModify: false })
        res.json({
            status: "materia actualizada"
        })

    } catch (err) {
        console.log(err)
    }

}

const getMateriaId = async (req, res, next) => {
    try {
        await Materia.findById(req.params.idMateria, {}, function (err, materias) {
            Teacher.populate(materias, { path: "teachers" }, function (err, materias) {
                res.status(200).json({
                    materias: materias
                })
            })
        })

    } catch (err) {
        next(err)
    }

}

module.exports = {
    addMateria,
    getMateria,
    editMateria,
    getMateriaId
}