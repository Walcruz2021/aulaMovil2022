import React from "react";
import { useState } from "react";
import { useScrollBlock } from "../../helpers/useScrollBlock";
import Loader from "../Load/Loader";
import Avatar from './Avatar';
import ChangePassword from './ChangePassword';
import DataUser from './DataUser';

const ProfileWrapper = ({dataUser, email, id}) => {
  const [load, setload] = useState(false);
  let [ blockScroll, allowScroll ] = useScrollBlock()
  return (
    <>
      { load ? <Loader /> : ""}
      <h2>Perfil</h2>
      <Avatar setLoader={setload} scrollEnable={allowScroll} scrollDisabled={blockScroll}/>

      <h2>Datos Personales</h2>
      <DataUser data={dataUser} email={email} id={id} setLoader={setload} scrollEnable={allowScroll} scrollDisabled={blockScroll}/>

      <h2>Cambiar Contraseña</h2>
      <ChangePassword id={id} email={email} setLoader={setload} scrollEnable={allowScroll} scrollDisabled={blockScroll}/>
    </>
  );
};

export default ProfileWrapper;
