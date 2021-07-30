import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

function Alertdanger(props) {
    const history=useHistory();
    const [warn,setWarn]=useState(props.isTrue);
    useEffect(()=>{
        setWarn(props.isTrue);
    },[props.isTrue])
    console.log(warn);
    return (
        warn?
        <>
           <div className="alert alert-danger alert-dismissible fade show">
                <strong>{warn}</strong>
            </div>
        </>
        :
        <>
        </>
    )
}

export default Alertdanger;
