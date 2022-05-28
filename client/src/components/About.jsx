import React from 'react';
import { NavLink } from 'react-router-dom';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import EmailIcon from '@material-ui/icons/Email';
import Cnavbar from './Cnavbar';

function About() {
    return (
        <>
            <Cnavbar />
            <div className="about-section paddingTB60 gray-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7 col-sm-6">
                            <div className="about-title clearfix">
                                <h1>About <span>MediBoard</span></h1>
                                <h3>Features:</h3>
                                <p className="about-paddingB">‣ Authenticated user will be able to upload their medical details and they will be able to manage or edit it.<br/>

                                ‣ Each user will be able to see other’s medical records with the unique 5 lettered UserID, but not able to edit or modify it(This feature in mainly for doctors and healthcare workers who want to see patient medical record to have a clear vison.).<br/>

                                ‣ They will also be able to view the graphical analysis of parameters(as of now showed 2 parameters).<br/>

                                ‣ User if want can delete their account if they want.<br/>
                                ‣ Implementation of forgot password feature and Mobile no. verification.<br/>
                                ‣ User can also get an appointment through chatbot which will be mailed to them after appointment.<br/>
                                ‣ They will also be able to contact us through email for any query.<br/>
                                ‣ Logged In users can post their need and other users will be able to respond to post.<br/>
                                ‣ And their further communications are performed through mail sent from our website.<br/>
                                ‣ User will be able to get the probability of various disease from the symptoms and text (NLP).
                                </p>
                                <div className="about-icons">
                                    <ul >
                                        <li><a href="https://www.facebook.com/" target="_blank"><FacebookIcon style={{ color: "red", fontSize: "50px", margin: "6px" }} /></a> </li>
                                        <li><a href="https://twitter.com/" target="_blank"><TwitterIcon style={{ color: "red", fontSize: "50px", margin: "6px" }} /></a> </li>
                                        <li> <a href="https://www.instagram.com/" target="_blank"><InstagramIcon style={{ color: "red", fontSize: "50px", margin: "6px" }} /></a> </li>
                                        <li> <a href="https://mail.google.com/" target="_blank"><EmailIcon style={{ color: "red", fontSize: "50px", margin: "6px" }} /></a> </li>
                                    </ul>





                                </div>
                            </div>
                        </div>
                        <div className="col-md-5 col-sm-6">
                            <div className="about-img">
                                <img src="https://devitems.com/preview/appmom/img/mobile/2.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About
