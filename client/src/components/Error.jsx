import React from 'react'
import { NavLink } from 'react-router-dom'
import Cnavbar from './Cnavbar';
import './error.css';

function Error() {
    return (
        <>
            <Cnavbar/>
            <div className="page-wrap d-flex flex-row align-items-center body">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 text-center">
              <span className="display-1 d-block text-danger animate__animated animate__heartBeat">404 😢</span>
              <div className="mb-4 display-4">The page you are looking for was not found.</div>
              <NavLink exact to='/' className="btn btn-outline-danger">Back to Home</NavLink>
            </div>
          </div>
        </div>
      </div>
        </>
    )
}

export default Error
