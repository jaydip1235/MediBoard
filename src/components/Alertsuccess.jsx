import React, { useEffect, useState } from 'react';

function Alertsuccess(props) {
    const [succ,setSucc]=useState(props.isTrue);
    useEffect(()=>{
        setSucc(props.isTrue);
    },[props.isTrue])
    return (
        succ?
        <>
            <div className="alert alert-success alert-dismissible fade show">
                <strong>{succ}</strong>
            </div>
        </>:
        <>
        </>
    )
}

export default Alertsuccess
