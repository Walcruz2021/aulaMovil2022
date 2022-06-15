import React from "react";
import UseFetch from "../../hooks/useFetch";

const FormSearch = ({setState, setKeyword}) => {

    const filterData = (data, value)=>{
        let subjects = data.data.materias
        let newSubjects = subjects.filter(sub => sub.name.includes(value))
        setState(newSubjects)
    }
    const apiCall = async()=>{
        let data = await UseFetch('http://localhost:3001/mat/getMateria')
        return data
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        let valueInput = e.target.searchSubjects.value
        setKeyword(valueInput)
        let data = await apiCall()
        filterData(data, valueInput)
    }
  return (
    <div className="form-search-container">
      <form className="form-search" onSubmit={handleSubmit}>
        <input type="search" name="searchSubjects" placeholder="Buscar..." />
        <button type="submit">Buscar</button>
      </form>
    </div>
  );
};

export default FormSearch;
