import React from 'react';
import { NavLink } from 'react-router-dom';
import LocalHospitalRoundedIcon from '@material-ui/icons/LocalHospitalRounded';

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
      <NavLink  exact to="/"><LocalHospitalRoundedIcon className="navbar-brand" style={{ fontSize: "50px" }} /></NavLink>
        <NavLink  exact to="/"><h1 className="navbar-brand" > Medi Board</h1></NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/about">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/contact">Contact</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/signup">Signup</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
