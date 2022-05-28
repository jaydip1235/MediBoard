import React, { useEffect, useState } from 'react';
import Cnavbar from './components/Cnavbar';
import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Phone from './components/Phone';
import Forgotpassword from  './components/Forgotpassword';
import Resetpassword from './components/Resetpassword';
import Profile from './components/Profile';
import Editprofile from './components/Editprofile';
import Searchprofile from './components/Searchprofile';
import Variation from './components/Variation';
import Error from './components/Error';
import Chat from './components/Chat';
import ErrorDoctor from './components/ErrorDoctor';
import Feed from './components/Feed';
import './App.css';
import {Route,Switch, useHistory} from 'react-router-dom';
import './App.css';
import Disease from './components/Disease';
import Nlp from './components/Nlp';

function App() {
  return (
    <>
    <Switch>
    <Route exact path='/' component={Home}/>  
    <Route exact path='/about' component={About}/>
    <Route exact path='/contact' component={Contact}/>
    <Route exact path='/login' component={Login}/>
    <Route exact path='/signup' component={Signup}/>
    <Route exact path='/profile' component={Profile}/>
    <Route exact path = "/verify/:phone" component={Phone}/>
    <Route exact path = "/forgotpassword" component={Forgotpassword}/>
    <Route exact path = "/editprofile" component={Editprofile}/>
    <Route exact path = "/searchprofile/:userID" component={Searchprofile}/>
    <Route exact path = "/error" component={Error}/>
    <Route exact path='/feed' component={Feed}/>
    <Route exact path = "/variation/:userID" component={Variation}/>
    <Route exact path = "/passwordreset/:resetToken" component={Resetpassword}/>
    <Route exact path='/chatbot' component={Chat}/>
    <Route exact path='/disease' component={Disease}/>
    <Route exact path='/nlp' component={Nlp}/>
    <Route exact path='/errordoctor'component={ErrorDoctor}/>
    <Route component={Error}/>
    </Switch>
    </>
  )
}

export default App
