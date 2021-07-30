import React, { useState } from 'react';
import Cnavbar from './Cnavbar';
import Alertdanger from './Alertdanger';
import Alertsuccess from './Alertsuccess';

function Forgotpassword(){ 
const [email,setEmail]=useState("");
const [succ,setSucc]=useState("");
const [warning,setWarning]=useState("");
const postData=async(e)=>{
    e.preventDefault();
    if(email===""){
        setWarning("❌ Please enter mail id");
            setTimeout(() => {
                setWarning("");
            }, 5000);
    }
    else{

        try {
            const res=await fetch('/api/auth/forgotpassword',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({email})
            })
            if(res.status===200){
                setSucc("✔ Mail sent !")
            }
            else{
                setWarning("❌ Invalid mail id !")
                setTimeout(() => {
                    setWarning("");
                }, 5000);
            }
        } catch (err) {
            setWarning("❌ Invalid mail id !")
                setTimeout(() => {
                    setWarning("");
                }, 5000);
        }
    }
}
    return (
        <>
            <Cnavbar/>
            <div className="loginbody h-100">
                <div id="login">
                    <div className="container">
                        <div id="login-row" className="row justify-content-center align-items-center">
                            <div id="login-column" className="col-md-6">
                                <div id="login-box" className="col-md-12">
                                    <form id="login-form" className="form" method="POST" onSubmit={postData}>
                                        <h3 className="text-center text-info bg-danger animate__animated animate__bounceIn"><span style={{color:"white"}}>Forgot password ?</span></h3>
                                        <Alertdanger isTrue={warning}/>
                                        <Alertsuccess isTrue={succ}/>
                                        <div className="form-group">
                                            <label htmlFor="email" className="text-info"><span style={{color:"black"}}>Email: </span></label><br />
                                            <input type="email" name="email" id="email" className="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter your email"/>
                                        </div>
                                        
                                        <div className="form-group">
                                            <label htmlFor="remember-me" className="text-info "></label><br/>
                                            <input type="submit" name="submit" className="btn btn-danger btn-md" value="Send mail" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Forgotpassword
