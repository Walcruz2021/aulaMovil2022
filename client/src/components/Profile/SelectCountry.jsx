import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from 'axios'

const SelectCountry = ({country}) => {
    const [Country, setCountry] = useState();

    const apiCall = ()=>{
        axios("https://restcountries.com/v3.1/all")
        .then(data => {
            let newContries;
            newContries = data.data.map((element) => element.name.common);
            newContries.sort(function (a, b) {
                if (a > b) {
                return 1;
                }
                if (a < b) {
                return -1;
                }
                // a must be equal to b
                return 0;
            });
            setCountry(newContries)
        })
        .catch(error => console.log(error))
    }

    useEffect(() => {
        apiCall()
    }, []);

  return (
    <div className="input-profile">
      <label htmlFor="country">País</label>
      <select name="country" id="country" value={country} disabled>
        <option value="" key=""></option>
        { Country && Country.map( (e, i) => (
               <option value={e} key={i} >{e}</option>
              
            ))
            }
      </select>
    </div>
  );
};

export default SelectCountry;
