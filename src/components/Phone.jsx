import React, { useState } from 'react';
import Cnavbar from './Cnavbar';
import { useHistory, useParams } from 'react-router';
import Alertdanger from './Alertdanger';
import Alertsuccess from './Alertsuccess';
import axios from 'axios';

function Phone() {
    const { phone } = useParams();
    const history=useHistory();
    const [code, setCode] = useState("");
    const [warning, setWarning] = useState("");
    const [succ,setSucc]=useState("");
    const postData = async (e) => {
        e.preventDefault();
        if(code===""){
            setWarning("Please enter the code !");
                setTimeout(() => {
                    setWarning("");
                }, 5000);
        }
        else{

            try {
                const res = await fetch(`/api/auth/verify/${phone}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ code })
                })
                if(res.status===200){
                    setSucc("✔ User verified !");
                    setTimeout(() => {
                        history.push('/login');
                    }, 5000);
                }else{
                    setWarning("❌ Wrong code !");
                    setTimeout(() => {
                        setWarning("");
                    }, 5000);
                }
            } catch (err) {
                setWarning("❌ Something went wrong !");
                setTimeout(() => {
                    setWarning("");
                }, 5000);
                console.log(err)
            }
        }
    }
    const resendCode=async()=>{
        try {
            await axios.post(`/api/auth/verify/${phone}/resend`);
            setSucc("✔ Code sent !");
                    setTimeout(() => {
                        setSucc("");
                    }, 5000);
        } catch (error) {
            setWarning("Something went wrong !");
                setTimeout(() => {
                    setWarning("");
                }, 5000);
        }
    }
    return (
        <div>
            <Cnavbar/>
            <form  method="POST" onSubmit={postData} className="h-100 w-100">
            <div className="d-flex justify-content-center align-items-center container my-auto">
                <div className="card py-5 px-3">
                    <h5 className="m-0 text-danger">Mobile phone verification</h5><span class="mobile-text">Enter the 4 digit code we just send on your mobile phone <b className="text-danger">+91{phone}</b></span>
                    <Alertdanger isTrue={warning}/>
                    <Alertsuccess isTrue={succ}/>
                    <div className="d-flex flex-row mt-5 "><input type="text" className="form-control text-center" value={code} onChange={(e) => { setCode(e.target.value) }} /></div>
                    <div className="text-center mt-5"><span className="d-block mobile-text">Don't receive the code?</span><span className="font-weight-bold text-danger cursor" onClick={resendCode}>Resend</span></div>
                    <input type="submit" value="Verify" className="btn btn-danger mt-4"/>
                </div>
            </div>
            </form>
        </div>
    )
}

export default Phone
