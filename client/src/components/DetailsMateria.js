import React from "react"
import {useDispatch,useSelector} from "react-redux"
import Select from "react-select"
import{getContacts} from "../reducer/actions"
import axios from "axios";

function DetailsMateria(){

    const listMateria=useSelector((state)=>state.allTurnos)
    console.log(listMateria,"--->")

    const arrayMat=[{ value: 'ingles', label: 'ingles' },
    { value: 'matematica', label: 'matematica' },
    { value: 'lengua', label: 'lengua' }]
    
    return(
        <div>
        <h1>Detalle Materia</h1>
<Select
placeholder="Seleccione Materia"
options={arrayMat}
/>
        <></>
        </div>
    )
}

export default DetailsMateria