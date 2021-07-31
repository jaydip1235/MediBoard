import React, { useState } from 'react';
import LocalHospitalRoundedIcon from '@material-ui/icons/LocalHospitalRounded';
import './contact.css';
import Cnavbar from './Cnavbar';
import Alertdanger from './Alertdanger';
import Alertsuccess from './Alertsuccess';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Contact() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [warn, setWarn] = useState("");
    const [succ, setSucc] = useState("");
    const history=useHistory();

    const postData = async(e) => {
        e.preventDefault();
        try {
            if (email === "" || message === "") {
                setWarn("❌ Don't leave any field empty");
                setTimeout(() => {
                    setWarn("");
                }, 5000);
            }
            else {
                const config = {
                    header: {
                        "Content-Type": "application/json",
                    },
                };

                const { data } = await axios.post(`/api/auth/contact`,{email,message},config);
                setEmail("");
                setMessage("");
                setSucc("✔ Mail sent");
                setTimeout(() => {
                    history.push('/');
                }, 3000);
            }
        } catch (error) {
            setWarn("❌ Something went wrong");
            setTimeout(() => {
                setWarn("");
            }, 5000);
        }
    }
    return (
        <>
            <Cnavbar />
            <Alertdanger isTrue={warn} />
            <Alertsuccess isTrue={succ} />
            <form method="POST" onSubmit={postData}>
                <div className="container contact">
                    <div className="row">
                        <div className="col-md-3 bg-danger text-center text-white">
                            <div className="contact-info">
                                <img src="https://image.ibb.co/kUASdV/contact-image.png" alt="image" />
                                <h2>Contact Us</h2>
                                <h4>We would love to hear from you !</h4>
                            </div>
                        </div>
                        <div className="col-md-9">
                            <div className="contact-form">
                                {/* <div className="form-group">
                                <label className="control-label col-sm-2" htmlFor="fname">First Name:</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="fname" placeholder="Enter First Name" name="fname" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="control-label col-sm-2" htmlFor="lname">Last Name:</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="lname" placeholder="Enter Last Name" name="lname" />
                                </div>
                            </div> */}
                                <div className="form-group">
                                    <label className="control-label col-sm-2" htmlFor="email">Email:</label>
                                    <div className="col-sm-10">
                                        <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="control-label col-sm-2" htmlFor="comment">Message:</label>
                                    <div className="col-sm-10">
                                        <textarea className="form-control" rows={5} id="comment" value={message} onChange={(e) => setMessage(e.target.value)} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-offset-2 col-sm-10">
                                        <button type="submit" className="btn btn-outline-danger">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Contact
