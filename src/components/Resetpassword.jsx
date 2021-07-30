import React, { useState } from 'react'
import Cnavbar from './Cnavbar';
import { useHistory, useParams } from 'react-router';
import Alertdanger from './Alertdanger';
import Alertsuccess from './Alertsuccess';

function Resetpassword() {
    const [password,setPassword]=useState("");
    const [cpassword,setCpassword]=useState("");
    const [warning,setWarning]=useState("");
    const [succ,setSucc]=useState("");
    const {resetToken}=useParams();
    const history=useHistory();
    const postData=async(e)=>{
        e.preventDefault();
        if(password==="" || cpassword===""){
            setWarning("❌ Passwords can't be empty !");
            setTimeout(() => {
                setWarning("");
            }, 5000);
        }
        else if(password!==cpassword){
            setWarning("❌ Passwords didn't match !");
                    setTimeout(() => {
                        setWarning("");
                    }, 5000);
        }
        else if(password.length<6){
            setWarning("❌ Password is to short !");
                    setTimeout(() => {
                        setWarning("");
                    }, 5000);
        }
        else{
            try {
                const res=await fetch(`/api/auth/passwordreset/${resetToken}`,{
                    method:"PUT",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({password})
                })
                if(res.status===201){

                    setSucc("✔ Password changed !")
                    setTimeout(() => {
                        history.push('/login');
                    }, 5000);
                }
                else{
    
                    setWarning("❌ Something went wrong.");
                    setTimeout(() => {
                        setWarning("");
                    }, 5000);
                }
            } catch (err) {
                setWarning("❌ Something went wrong.");
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
                                        <h3 className="text-center bg-danger animate__animated animate__bounceIn"><span style={{color:"white"}}>Reset password</span></h3>
                                        <Alertdanger isTrue={warning}/>
                                        <Alertsuccess isTrue={succ}/>
                                        <div className="form-group">
                                            <label htmlFor="password" className="text-info"><span style={{color:"black"}}>Password: </span></label><br />
                                            <input type="password" name="password" id="password" className="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                                            <label htmlFor="cpassword" className="text-info"><span style={{color:"black"}}>Confirm password: </span></label><br />
                                            <input type="password" name="cpassword" id="cpassword" className="form-control" value={cpassword} onChange={(e)=>{setCpassword(e.target.value)}}/>
                                        </div>
                                        
                                        <div className="form-group">
                                            <input type="submit" name="submit" className="btn btn-danger btn-md" value="Done" />
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

export default Resetpassword;