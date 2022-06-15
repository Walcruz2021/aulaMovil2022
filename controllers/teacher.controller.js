const express = require('express');
const Teacher = require('../database/models/teacher');
const Materia = require('../database/models/materia');
const jwt = require('jsonwebtoken')

function verifyToken(req, res) {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
        console.log("ingreso aqui")
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
    }
    else {
        console.log("ingreso en el else")
        return res.status(403).json({ error: "no existe token" })
    }

}

const getTeacher = async (req, res) => {

    const buscado = await Teacher.find()
    if (buscado) {
        res.status(200).json({
            buscado: buscado
        })
    } else
        res.status(204).json({
            status: "teachers no encontrados"
        })
}

const getTeacherId = async (req, res) => {
    // verifyToken(req, res)
    // jwt.verify(req.token, "secret", async (err, authData) => {
    //     if (err) {
    //         //res.sendStatus(403)
    //         return res.status(403).json({ error: "no existe token o es invalido" })
    //     } else {
    //         try {
    //             const teacher = await Teacher.findById(req.params.id)
    //             //res.send(teacher)
    //             if (teacher) {
    //                 res.json({
    //                     teacher: teacher
    //                 })
    //             }
    //         }
    //         catch (err) {
    //             console.log(err)
    //         }
    //     }
    // })


    const teacher = await Teacher.findById(req.params.id)
    //res.send(teacher)

    if (teacher) {
        res.status(200).json({
            teacher: teacher
        })
    } else {
        res.status(204).json({
            status: "teacher no encontrado"
        })
    }

}
const editTeacher = async (req, res) => {
    const { firstName, lastName, dni, address, country, province, username, phone, status } = req.body
    const newTeacher = {
        firstName: firstName,
        lastName: lastName,
        dni: dni,
        address: address,
        country: country,
        province: province,
        username: username,
        phone: phone,
        status: status
    }
    try {
        await Teacher.findByIdAndUpdate(req.params.id, newTeacher, { userFindModify: false })
        res.status(200).json({
            status: "teacher actualizado"
        })

    } catch (err) {
        console.log(err)
    }
}

//recibe el id de materia 
const addTeacher = async (req, res, next) => {

    const { firstName, lastName, dni, address, country, province, username, phone, status } = req.body;
    const teacher = new Teacher({
        firstName: firstName,
        lastName: lastName,
        dni: dni,
        address: address,
        country: country,
        province: province,
        username: username,
        phone: phone,
        status: status
    })


    const materia = await Materia.findById(req.params.id)
    console.log(materia.name, "--->nombre")
    //teacher.mat = materia

    teacher.materias.push(materia.name)

    await teacher.save()
    materia.teachers.push(teacher)
    await materia.save()
    res.send(teacher)
    try {
        res.status(200).json({
            status: "teacher creada"
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports = {
    getTeacher,
    getTeacherId,
    editTeacher,
    addTeacher
}