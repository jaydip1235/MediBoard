import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import LocalHospitalRoundedIcon from '@material-ui/icons/LocalHospitalRounded';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import MessageIcon from '@material-ui/icons/Message';
import './snavbar.css';

function Navbar() {
    const history=useHistory();
    const logOut=()=>{
        localStorage.removeItem("authToken");
        history.push('/login');
    }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <NavLink exact to="/"><LocalHospitalRoundedIcon className="navbar-brand" style={{ fontSize: "50px" }} /></NavLink>
        <NavLink exact to="/"><h1 className="navbar-brand" > Medi Board</h1></NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/feed">Feed</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/disease">Disease</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/nlp">NLP</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/contact">Contact</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/profile"><AccountCircleIcon/></NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/chatbot"><MessageIcon/></NavLink>
            </li>
            <li className="nav-item">
              <p className="nav-link logout-p my-0" onClick={logOut}><ExitToAppIcon/></p>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
