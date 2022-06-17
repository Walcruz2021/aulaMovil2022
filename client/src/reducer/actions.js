import axios from "axios";
import { types } from "../types/types";
import formatDate from '../helpers/formatDate'

///////////////////ESTUDIANTES///////////////////////////

export function getStudents() {
  return async function (dispatch) {
    const students = await axios.get("http://localhost:3001/stu/getStudents/", {});
    return dispatch({
      type: types.GET_STUDENTS,
      payload: students.data.students
    });
  };
}

export function getStudent(student) {
  return async function (dispatch) {
    let save = {
      firstName : student.firstName,
      lastName : student.lastName,
      cohorte : student.cohorte,
      dni : student.dni,
      phone : student.phone,
      address : student.address,
      province : student.province,
      avatar : student.avatar,
      dateNac : student.dateNac ? formatDate(student.dateNac) : undefined,
      status : student.status
    }
    
    sessionStorage.setItem('student', JSON.stringify(save))
    return dispatch({
      type: types.GET_STUDENT,
      payload: save,
      loading : false
    })
  }
}

//ESTA FUNCION AGREGA UNA MATERIA AL ARRAY DE MATERIA DE UN ESTUDIANTE EN PARTICULAR
//ES DECIR SERVIRIA PARA QUE EL ALUMNO SE INSCRIBA EN UNA MATERIA
// en payload llegan los valores enviados por input (en este caso vendria el id de la materia a agregar)
//por tanto la materia ya debe estar cargada previamente
//idStudents seria el id del estudiante que recibira el agregado de la materia mencionada 
export function addMateriaStudents(payload, idStudent) {
  console.log(payload)
  console.log(idStudent)

  return async function (dispatch) {
    try {
      var newMateria = await axios.post(`http://localhost:3001/stu/addMateriaStu/${idStudent}`, payload);
      return newMateria
    } catch (err) {
      console.log(err)
    }
  }
}

/////////////////////MATERIAS/////////////////////

export function getMaterias(data) {
  return async function (dispatch) {
    sessionStorage.setItem('subjects', JSON.stringify(data))
    return dispatch({
      type: types.GET_SUBJECT,
      payload: data
    })
  }
}


///////////////////////TEACHER////////////////////////////////
export function getTeachers() {
  return async function (dispatch) {
    const teachers = await axios.get("http://localhost:3001/api/getTeacher/", {});
    return dispatch({
      type: types.GET_TEACHERS,
      payload: teachers.data.buscado
    })
  }
}
