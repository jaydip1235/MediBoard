import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Navbar from './Navbar';
import Snavbar from './Snavbar';

function Cnavbar(props) {
    const [auth,setAuth]=useState(localStorage.getItem("authToken"));
    const history=useHistory();
    useEffect(()=>{
        setAuth(localStorage.getItem("authToken"));
    },[history])
    return (
        <>
        {auth ? <Snavbar/> : <Navbar/>}
        </>
    )
}

export default Cnavbar
