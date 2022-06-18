import React from 'react';
import { useSelector } from 'react-redux';
import SideBar from './SideBar';
import Topbar from './topbar';

const NavBar = () => {
    const estado = useSelector((state) => state);
    return (
        <>
            <Topbar user={estado.auth.user}/>
            <SideBar user={estado.auth.user}/>
        </>
    );
}

export default NavBar;
