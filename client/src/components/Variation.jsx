import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import Chart from './Chart';
import Cnavbar from './Cnavbar';
import axios from 'axios';

function Variation() {
    const { userID } = useParams();
    const history = useHistory();
    const [param1, setParam1] = useState([{
        val: ""
    }]);
    const [param2, setParam2] = useState([{
        val: ""
    }]);
    console.log(userID);

    const getUser = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const { data } = await axios.get(`/api/auth//user/${userID}`, config);
            setParam1(data.param1);
            setParam2(data.param2);
        } catch (err) {
            console.log("Something went wrong");
        }
    }
    let liParam1 = [{
        val: "No data"
    }]
    let liParam2 = [{
        val: "No data"
    }]
    useEffect(() => {
        getUser();
    }, [history])
    liParam1 = param1.filter(obj => obj.val < 1000);
    liParam2 = param2.filter(obj => obj.val < 1000);

    return (
        <>
            <Cnavbar />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12 col-12 mt-2">
                        <h1 className="text-white text-center bg-danger">Blood pressure</h1>
                        <Chart data={liParam1} bgCol="pink" col="red" cLab="Blood pressure"/>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12 col-12 mt-2">
                        <h1 className="text-white text-center bg-info">Blood sugar</h1>
                        <Chart data={liParam2} bgCol="cyan" col="blue" cLab="Blood sugar"/>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Variation;
