import React from "react";
import axios from 'axios';
import host from "../../helpers/host";
import {useSelector } from 'react-redux'
import { useState } from "react";
import Sweet from 'sweetalert2'

const Avatar = () => {
  const [File, setFile] = useState("");
  const estado = useSelector(state => state.auth)
  
  const handleChange = () => {
    let $img = document.querySelector("#image-avatar");
    let $inputFile = document.querySelector("#avatar");
    let button = document.querySelector('button')
    const archivos = $inputFile.files;
    if (!archivos || !archivos.length) {
      $img.src = "";
      return;
    }
    const primerArchivo = archivos[0];
    setFile(primerArchivo)
    const objectURL = URL.createObjectURL(primerArchivo);
    $img.src = objectURL;
    button.style.display = "block"
  };

  const apiPost= (file)=>{
    let body = new FormData
    body.append("avatar", file)
    axios.put(`${host.development}/stu/editAvatar/${estado.user.id}`, body ,{headers: {
      "Content-Type": "multipart/form-data",
    }})
    .then(response=>{
      sessionStorage.setItem('student', JSON.stringify({...estado.student, avatar : response.data.response.url}))
      Sweet.fire({
        icon: "success",
        title: `Foto actualizada correctamente`,
        showConfirmButton: false,
        timer: 1500,
      });
    })
    .catch(error => {
      console.log(error)
    })

  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    apiPost(File)
  
    
  }

  return (
    <div className="avatar-container">
      <div className="image-avatar-contain">
        <img
          src={ estado.student.avatar ? estado.student.avatar : '/default-image-avatar.jpg' }
          alt="foto de perfil"
          id="image-avatar"
        />
      </div>
      <form className="form-avatar" onSubmit={handleSubmit} id="form-avatar">
        <label htmlFor="avatar">Cambiar foto</label>
        <input id="avatar" type="file" name="avatar" onChange={handleChange} />
        <button type="submit" className="btn">Guardar</button>
      </form>
    </div>
  );
};

export default Avatar;
