import React, { useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import Cnavbar from './Cnavbar';
import './home.css';
import SearchIcon from '@material-ui/icons/Search';
import LocalHospitalRoundedIcon from '@material-ui/icons/LocalHospitalRounded';
import Alertdanger from './Alertdanger';
import axios from 'axios';


function Home() {
    const [user, setUser] = useState("");
    const [userID, setUserID] = useState("");
    const [searchID, setSearchID] = useState("");
    const [warn, setWarn] = useState("");
    const history = useHistory();
    const getUser = async () => {
        if (localStorage.getItem("authToken")) {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                };
                const { data } = await axios.get("/api/private", config);
                console.log(data);
                setUser(data.user.username);
                setUserID(data.user.userID);
            } catch (err) {
                console.log(err)
            }
        }
    }
    useEffect(() => {
        getUser();
    }, [history])

    const postData = async(e) => {
        e.preventDefault();
        try {
            if (searchID === userID && searchID !== "") {
                history.push('/profile');
            }
            else {
                const config = {
                    headers: {
                        "Content-Type": "application/json"
                    },
                };
                const { data } = await axios.get(`/api/auth/user/${searchID}`, config);
                history.push(`/searchprofile/${searchID}`);
            }
        } catch (error) {
            setWarn("Invalid userID !");
            setSearchID("");
            setTimeout(() => {
                setWarn("");
            }, 5000);
        }
    }

    return (
        <>
            <Cnavbar />
            <Alertdanger isTrue={warn} />
            <form method="POST" onSubmit={postData}>
                <div className="input-group my-5 col-lg-4 col-md-8 col-sm-10 col-12 mx-auto ">
                    <input type="text" className="form-control bg-danger text-white searchInp text-center" placeholder="Enter UserID" aria-label="Recipient's username" aria-describedby="basic-addon2" value={searchID} onChange={(e) => setSearchID(e.target.value)} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-danger" type="submit"><SearchIcon /></button>
                    </div>
                </div>
                <div className="container">
                    <div className="jumbotron jumbotron-fluid main-head">
                        <div className="container">
                            <h1 className="display-4 text-center text-danger animate__animated animate__bounceInDown">Welcome <strong>{user}</strong></h1>
                            <p className="text-center h1 text-danger animate__animated animate__rotateIn">To</p>
                            <h1 className="display-2 text-center text-danger font-weight-bold animate__animated animate__swing">Medi Board <LocalHospitalRoundedIcon style={{ fontSize: "90px", marginBottom: "-10px" }} /></h1>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default Home
