import React from 'react';
import { useState } from 'react';
import FormSearch from '../components/subjects/formSearch';
import ListContain from '../components/subjects/listContain';
import '../styles/search.css'
import { useSelector } from 'react-redux'

const SearchSubjects = () => {
    const subjects = useSelector((state) => state.auth.subjects);
    const student = useSelector((state) => state.auth.student);
    const [InputValue, setInputValue] = useState();
    const [keyword, setKeyword] = useState();
    const newArrayID = subjects ?  subjects.map(sub => sub._id) : false;


    return (
        <main className='search-subjects'>
            { !student.status ? <span className="danger-new">Completa primeros tus datos antes de inscribirte, de lo contrario no prodras inscribirte a una materia</span> : ""}
            <h4>Agregar Materia</h4>
            <FormSearch setState={setInputValue} setKeyword={setKeyword}/>
            <div className='title-result'>
                <h5>Resultado de: {keyword}</h5>
            </div>
            <div className='search-result'>
                <ul className='list-container-result'>
                    {
                        InputValue &&
                        InputValue.map((result, i) => <ListContain key={i + result} data={result} subjectsInscripte={newArrayID}/>)
                    }
                    
                </ul>
            </div>
        </main>
        
    );
}

export default SearchSubjects;
