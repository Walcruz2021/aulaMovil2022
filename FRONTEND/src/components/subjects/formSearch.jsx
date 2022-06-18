import React, { useState } from "react";
import host from "../../helpers/host";
import UseFetch from "../../hooks/useFetch";
import Loader from "../Load/Loader";

const FormSearch = ({ setState, setKeyword }) => {
  const [load, setload] = useState(false);
  const filterData = (data, value) => {
    let subjects = data.data.materias;
    let newSubjects = subjects.filter((sub) => sub.name.includes(value));
    setState(newSubjects);
  };
  const apiCall = async () => {
    let data = await UseFetch(`${host.development}/mat/getMateria`);
    if (data.status === 200) {
      setload(false)
    }
    return data;
  };
  const handleSubmit = async (e) => {
    setload(true)
    e.preventDefault();
    let valueInput = e.target.searchSubjects.value;
    setKeyword(valueInput);
    let data = await apiCall();
    filterData(data, valueInput);
  };
  return (
    <>
      { load ? <Loader /> : ""}
      <div className="form-search-container">
        <form className="form-search" onSubmit={handleSubmit}>
          <input type="search" name="searchSubjects" placeholder="Buscar..." />
          <button type="submit">Buscar</button>
        </form>
      </div>
    </>
  );
};

export default FormSearch;
