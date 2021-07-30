import React, { useState, useEffect } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import Cnavbar from './Cnavbar';
import Alertdanger from './Alertdanger';
import Alertsuccess from './Alertsuccess';



function Signup() {
    const history = useHistory();
    const [user, setUser] = useState({
        username: "", email: "", phone: "", password: "", cpassword: ""
    })
    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            history.push("/");
        }
    }, [history]);
    const [warning, setWarning] = useState("");
    const [succ,setSucc]=useState("");
    const varyText = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value })
    }
    const postData = async (e) => {
        try {
            e.preventDefault();
            const { username, email, phone, password, cpassword } = user;
            if (username === "" || email === "" || phone === "" || password === "" || cpassword === ""){
                setWarning("❌ Enter all the details");
                setTimeout(() => {
                    setWarning("");
                }, 5000);
            }
            else if (password !== cpassword){
                setWarning("❌ Passwords didn't match");
                setTimeout(() => {
                    setWarning("");
                }, 5000);
            }
            else if (password.length < 6){
                setWarning('❌ Password is too short.');
                setTimeout(() => {
                    setWarning("");
                }, 5000);
            } 
            else {
                const res = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, email, phone, password })
                })
                console.log(res.status);
                if (res.status === 200) {
                    setSucc("✔ Registration successful !");
                    setTimeout(() => {
                        history.push(`/verify/${phone}`);
                    }, 5000);
                }
                else{
                    setWarning("❌ Something went wrong");
                    setTimeout(() => {
                        setWarning("");
                    }, 5000);
                }
            }
        } catch (err) {
            window.alert(`${err}`);
        }
    }
    
    return (
        <>
            <Cnavbar />
            <div className="container">
                <form className="form-horizontal role-form" method="POST"  onSubmit={postData}>
                    <h3 style={{ color: "white" }} className="h1 text-center animate__animated animate__bounce bg-danger border rounded">Registration</h3>
                    <Alertdanger isTrue={warning}/>
                    <Alertsuccess isTrue={succ}/>
                    <div className="form-group">
                        <label htmlFor="firstName" className="col-sm-12 control-label">Name*</label>
                        <div className="col-sm-9">
                            <input type="text" value={user.username} onChange={varyText} id="Name" placeholder="Name" className="form-control" name="username" autoFocus />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className="col-sm-12 control-label">Email* </label>
                        <div className="col-sm-9">
                            <input type="email" value={user.email} onChange={varyText} id="email" placeholder="Email" className="form-control" name="email" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber" className="col-sm-12 control-label">Phone number*</label>
                        <div className="col-sm-9">
                            <input type="phoneNumber" value={user.phone} onChange={varyText} id="phoneNumber" placeholder="Enter 10-digit mobile number" className="form-control" name="phone" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="col-sm-12 control-label">Password*</label>
                        <div className="col-sm-9">
                            <input type="password" value={user.password} onChange={varyText} id="password" placeholder="Password" className="form-control" name="password" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password" className="col-sm-12 control-label">Confirm Password*</label>
                        <div className="col-sm-9">
                            <input type="password" value={user.cpassword} onChange={varyText} id="cpassword" placeholder="Confirm password" className="form-control" name="cpassword" />
                        </div>
                    </div>
                    {/* <div className="form-group">
                    <label htmlFor="birthDate" className="col-sm-6 control-label">Date of Birth*</label>
                    <div className="col-sm-9">
                    <input type="date" id="birthDate" className="form-control" name="date"/>
                    </div>
                </div> */}
                    {/* <div className="form-group">
                        <label htmlFor="Height" className="col-sm-3 control-label">Height* </label>
                    <div className="col-sm-9">
                        <input type="number" id="height" placeholder="Please write your height in centimetres" className="form-control" name="height"/>
                    </div>
                </div>
                 <div className="form-group">
                        <label htmlFor="weight" className="col-sm-3 control-label">Weight* </label>
                    <div className="col-sm-9">
                        <input type="number" id="weight" placeholder="Please write your weight in kilograms" className="form-control" name="weight"/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-3">Gender</label>
                    <div className="col-sm-6">
                        <div className="row">
                            <div className="col-sm-6">
                                <label className="radio-inline">
                                    <input type="radio" id="femaleRadio" value="Female" name="gender"/> Female
                                </label>
                            </div>
                            <div className="col-sm-6">
                                <label className="radio-inline">
                                    <input type="radio" id="maleRadio" value="Male" name="gender"/> Male
                                </label>
                            </div>
                            <div className="col-sm-6">
                                <label className="radio-inline">
                                    <input type="radio" id="othersRadio" value="Others" name="gender"/> Others
                                </label>
                            </div>
                        </div>
                    </div>
                </div> */}
                    <button type="submit" className="btn btn-danger btn-block">Register</button>
                    <br />
                    <div className="form-group col-lg-12 col-md-12 col-sm-12 col-12">
                        <NavLink className="text-danger float-right text-center" exact to='/login'>Already registered ?</NavLink>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup
