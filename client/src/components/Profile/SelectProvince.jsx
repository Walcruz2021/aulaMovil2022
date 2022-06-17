import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import Select from "react-select"

const SelectCountry = ({province, disabled}) => {
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
  let options= [{value: 'Buenos Aires', label: 'Buenos Aires'},
  {value: 'Catamarca', label: 'Catamarca'},
  {value: 'Chaco', label: 'Chaco'},
  {value: 'Chubut', label: 'Chubut'},
  {value: 'Ciudad Autónoma de Buenos Aires', label: 'Ciudad Autónoma de Buenos Aires'},
  {value: 'Corrientes', label: 'Corrientes'},
  {value: 'Córdoba', label: 'Córdoba'},
  {value: 'Entre Ríos', label: 'Entre Ríos'},
  {value: 'Formosa', label: 'Formosa'},
  {value: 'Jujuy', label: 'Jujuy'},
  {value: 'La Pampa', label: 'La Pampa'},
  {value: 'La Rioja', label: 'La Rioja'},
  {value: 'Mendoza', label: 'Mendoza'},
  {value: 'Misiones', label: 'Misiones'},
  {value: 'Neuquén', label: 'Neuquén'},
  {value: 'Río Negro', label: 'Río Negro'},
  {value: 'Salta', label: 'Salta'},
  {value: 'San Juan', label: 'San Juan'},
  {value: 'San Luis', label: 'San Luis'},
  {value: 'Santa Cruz', label: 'Santa Cruz'},
  {value: 'Santa Fe', label: 'Santa Fe'},
  {value: 'Santiago del Estero', label: 'Santiago del Estero'},
  {value: 'Tierra del Fuego, Antártida e Islas del Atlántico Sur', label: 'Tierra del Fuego, Antártida e Islas del Atlántico Sur'},
  {value: 'Tucumán', label: 'Tucumán'}]
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
    </div>
  );
};

export default SelectCountry;
