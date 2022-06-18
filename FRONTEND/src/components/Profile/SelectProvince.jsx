import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Select from "react-select"

const SelectCountry = ({province, disabled, selectError}) => {
  const [Provinces, setProvinces] = useState([]);
  const [value, setValue] = useState({
    value : province,
    label : province
  });
  const apiCall = () => {
    axios("https://apis.datos.gob.ar/georef/api/provincias")
      .then((data) => {
        let newProvinces = data.data.provincias.map((element) => element.nombre);
        newProvinces.sort(function (a, b) {
          if (a > b) {
            return 1;
          }
          if (a < b) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        newProvinces= newProvinces.map(province => (
          {
            value : province,
            label : province
          }
        ))
        setProvinces(newProvinces)
      })
      .catch((error) => console.log(error));
  };


  useEffect(() => {
    apiCall()
  }, [disabled]);
  return (
    <div className="input-profile" >
      <label htmlFor="provinces">Provincia</label>
      { disabled ?  <Select
        defaultValue={value}
        onChange={setValue}
        options={Provinces}
        name="province"
        isDisabled
      /> : <Select
      defaultValue={value}
      onChange={setValue}
      options={Provinces}
      name="province"
    />}
    <span className="danger-msg">{selectError}</span>
    </div>
  );
};

export default SelectCountry;
