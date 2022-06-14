const express = require('express');
const Teacher = require('../database/models/teacher');
const Materia = require('../database/models/materia');

const getTeacher= async (req, res) => {
 
    const buscado = await Teacher.find()
    res.json({
        buscado: buscado
    })
}

const getTeacherId=async (req, res) => {

    try {
        const buscado = await Teacher.findById(req.params.id)
        res.send(buscado)
        res.json({
            buscado: buscado
        })
    }
    catch (err) {
        console.log(err)
    }
}

const editTeacher=async (req, res) => {
    const { firstName, lastName, dni, address, country, province, email, phone, status } = req.body
    const newTeacher = {
        firstName: firstName,
        lastName: lastName,
        dni: dni,
        address: address,
        country: country,
        province: province,
        email: email,
        phone: phone,
        status: status
    }
    try {
        await Teacher.findByIdAndUpdate(req.params.id, newTeacher, { userFindModify: false })
        res.json({
            status: "teacher actualizado"
        })

    } catch (err) {

    }
}

const addTeacher=async (req, res, next) => {

    const { firstName, lastName, dni, address, country, province, email, phone, status } = req.body;
    const teacher = new Teacher({
        firstName: firstName,
        lastName: lastName,
        dni: dni,
        address: address,
        country: country,
        province: province,
        email: email,
        phone: phone,
        status: status
    })

    try {
        const materia = await Materia.findById(req.params.id)
        console.log(materia.name, "--->nombre")
        teacher.mat = materia
        if (teacher.materias) {
            teacher.materias.push(materia.name)
        }
        await teacher.save()
        materia.teachers.push(teacher)
        await materia.save()
        res.send(teacher)
        res.json({
            status: "teacher creada"
        })
    }
    catch (error) {
        next(error)
    }
}

module.exports={
    getTeacher,
    getTeacherId,
    editTeacher,
    addTeacher
}