import React from "react";

const Avatar = () => {

  

  return (
    <div className="avatar-container">
      <div className="image-avatar-contain">
        <img
          src="/web-developer-design-vector-5884837.jpg"
          alt="foto de perfil"
        />
      </div>
      <form className="form-avatar">
        <label htmlFor="avatar">Cambiar Foto</label>
        <input id="avatar" type="file" />
        <button type="submit">Cambiar foto</button>
      </form>
    </div>
  );
};

export default Avatar;
