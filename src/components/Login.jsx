import React, { useEffect, useState } from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import Cnavbar from './Cnavbar';
import Alertdanger from './Alertdanger';
import Alertsuccess from './Alertsuccess';
import axios from 'axios';

function Login() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [warning,setWarning]=useState("");
    const [succ,setSucc]=useState("");
    const history=useHistory();
    useEffect(() => {
        if (localStorage.getItem("authToken")) {
          history.push("/");
        }
      }, [history]);
    const postData=async(e)=>{
        e.preventDefault();
        const config = {
            header: {
              "Content-Type": "application/json",
            },
          };
        try {
            if(email==="" || password===""){
                setWarning("❌ Enter all the details");
                setTimeout(() => {
                    setWarning("");
                }, 5000);
            }
            else{
                const { data } = await axios.post(
                    "/api/auth/login",
                    { email, password },
                    config
                  );
                  
                  localStorage.setItem("authToken", data.token);
                  setSucc("✔ Login successful !");
                  setTimeout(() => {
                      history.push('/');
                  }, 5000);
            }
        } catch (err) {
            setWarning("❌ Invalid Credentials !");
            setTimeout(() => {
                setWarning("");
            }, 5000);
        }
    }
    return (
        <>
        <Cnavbar/>
            <div className="loginbody h-100">
            <Alertsuccess isTrue={succ}/>
                <div id="login">
                    <div className="container">
                        <div id="login-row" className="row justify-content-center align-items-center">
                            <div id="login-column" className="col-md-6">
                                <div id="login-box" className="col-md-12">
                                    <form id="login-form" className="form" method="POST" onSubmit={postData}>
                                        <h3 className="text-center text-info animate__animated animate__bounceIn h2 bg-danger p-1 border rounded"><span style={{color:"white"}}>Login</span></h3>
                                        <Alertdanger isTrue={warning}/>
                                        <div className="form-group">
                                            <label htmlFor="email" className="text-info"><span style={{color:"black"}}>Email: </span></label><br />
                                            <input type="email" name="email" id="email" className="form-control" value={email} onChange={(e)=>{setEmail(e.target.value)}} placeholder="Enter your email"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password" className="text-info"><span style={{color:"black"}}>Password: </span></label><br />
                                            <input type="password" name="password" id="password" className="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter your password"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="remember-me" className="text-info "><span><NavLink id="remember-me" className="text-danger" exact to ="/forgotpassword" >Forgot password ?</NavLink> </span></label><br/>
                                            <input type="submit" name="submit" className="btn btn-danger btn-md" value="submit" />
                                        </div>
                                        <div id="register-link" className="text-right">
                                            <NavLink exact to="/signup" className="text-info"><span style={{color:"red"}}>Register here</span></NavLink>
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

export default Login;
