import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

const SelectCountry = ({province}) => {
  const [Provinces, setProvinces] = useState();

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
        setProvinces(newProvinces)
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    apiCall();
  }, []);

  return (
    <div className="input-profile">
      <label htmlFor="provinces">País</label>
      <select name="provinces" id="provinces" value={province} disabled>
        <option value="" key=""></option>
        {Provinces &&
          Provinces.map((e, i) => (
            <option value={e} key={i}>
              {e}
            </option>
          ))}
      </select>
    </div>
  );
};

export default SelectCountry;
