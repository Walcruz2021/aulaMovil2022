import React from 'react';
import { useEffect } from 'react';
import Loader from '../components/Load/Loader';
import ProfileWrapper from '../components/Profile/ProfileWrapper';
import host from '../helpers/host';
import UseFetch from '../hooks/useFetch';
import '../styles/Profile.css'
import { useSelector, useDispatch } from "react-redux";
import { getStudent } from "../reducer/actions";

const Profile = () => {
    const estado = useSelector((state) => state);
    const student = estado.auth.student 
    const dispatch = useDispatch();

    let apiCall = async ()=>{ 
        //let resolve = await UseFetch(`${host.development}/stu/getStudent/${estado.auth.user.id}`);
        let resolve = await UseFetch(`/stu/getStudent/${estado.auth.user.id}`);
        if(resolve.status === 200){
            dispatch(getStudent(resolve.data.students));
        }
        
    }


    useEffect(() => {
        apiCall()
        
    }, []);
    
    return (
        <main className='profile-container'>
            {
                student ? <ProfileWrapper dataUser={student} email={estado.auth.user.email} id={estado.auth.user.id} /> : <Loader />
            }
           
        </main>
    );
}

export default Profile;
