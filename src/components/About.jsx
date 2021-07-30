import React from 'react';
import {NavLink} from 'react-router-dom';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import EmailIcon from '@material-ui/icons/Email';
import Cnavbar from './Cnavbar';

function About() {
    return (
        <>
            <Cnavbar/>
            <div className="about-section paddingTB60 gray-bg">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7 col-sm-6">
                            <div className="about-title clearfix">
                                <h1>About <span>Appmom</span></h1>
                                <h3>Lorem ipsum dolor sit amet </h3>
                                <p className="about-paddingB">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet dolor libero, eget venenatis mauris finibus dictum. Vestibulum quis elit eget neque porttitor congue non sit amet dolor. Proin pretium purus a lorem ornare </p>
                                <p>sed lobortis pulvinar. Integer laoreet mi id eros porta euismod. Suspendisse potenti. Nulla eros mauris, convallis et sem tempus, viverra hendrerit sapien</p>
                                <div className="about-icons">
                                    <ul >
                                        <li><NavLink exact to="https://www.facebook.com/"><FacebookIcon style={{color:"red", fontSize:"50px",margin:"6px"}}/></NavLink> </li>
                                        <li><NavLink exact to="https://twitter.com/"><TwitterIcon style={{color:"red", fontSize:"50px",margin:"6px"}}/></NavLink> </li>
                                        <li> <NavLink exact to="https://plus.google.com/"><InstagramIcon style={{color:"red", fontSize:"50px",margin:"6px"}}/></NavLink> </li>
                                        <li> <NavLink exact to="http://www.gmail.com"><EmailIcon style={{color:"red", fontSize:"50px", margin:"6px"}}/></NavLink> </li>
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
