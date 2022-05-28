import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';
import { useHistory } from 'react-router-dom';
import Cnavbar from './Cnavbar';

const Nlp = () => {

    const history = useHistory();

    const [message, setMessage] = useState([]);
    const [age, setAge] = useState("");
    const [conditions, setConditions] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem("authToken")) history.push('/login');
    }, [])

    const getDisease = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'App-Id': process.env.REACT_APP_APP_ID,
                    'App-Key': process.env.REACT_APP_API_KEY
                }
            }
            const bodyData = {
                age: {
                    value: parseInt(age)
                },
                text:message
            }
            console.log(bodyData);
            const { data } = await axios.post(`https://api.infermedica.com/v3/parse`, bodyData, config);
            console.log(data);
            setConditions(data.mentions);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>

            <Cnavbar />


            {/* Added part */}

            <div className="container rounded bg-white mt-5 mb-5" style={{minHeight:'60vh' ,maxHeight: '60vh', overflowY: 'scroll' }}>
                <div className="row">
                    <div className="col-md-7 border-right">
                        <div className="p-3 py-5">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="text-right">Get disease from text</h4>
                            </div>
                            <div className="row mt-3">
                                <div className="form-group w-100">
                                    {/* <label htmlFor="age" className="col-sm-12 control-label">Age</label> */}
                                    <div className="col-sm-9 w-100 my-4">
                                        <input type="number" min='5' value={age} onChange={(e) => setAge(e.target.value)} id="age" placeholder="Enter age" className="form-control w-100" name="age" />
                                    </div>
                                    <div className="col-sm-9 w-100 my-4">
                                        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} id="text" placeholder="Enter text" className="form-control w-100" name="message" />
                                    </div>
                                </div>
                            </div>
                            {/* <div className="row mt-3">
                <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control" placeholder="country" defaultValue /></div>
                <div className="col-md-6"><label className="labels">State/Region</label><input type="text" className="form-control" defaultValue placeholder="state" /></div>
              </div> */}
                            <div className="mt-5 text-center"><button className="btn btn-primary profile-button btn-outline-danger" onClick={getDisease}>Get</button></div>
                            {/* <div className="mt-5 text-center"><Button variant="outlined" color="secondary" className="profile-button float-right" onClick={handleClickOpen}>Delete profile</Button></div> */}
                        </div>
                    </div>
                    <div className="col-md-4" style={{ maxHeight: '100%' }}>
                        <div className="py-5 d-flex align-items-center flex-column justify-content-center" style={{ maxHeight: '100%' }} >
                            {
                                conditions.length
                                    ?
                                    conditions.map((val) => {
                                        return (
                                            <div className="w-75 border border-dark my-2" key={val.id}>
                                                <ul>
                                                    <li style={{ listStyle: 'none' }}><strong>Name: </strong>{val.common_name}</li>
                                                    <li style={{ listStyle: 'none' }}><strong>Choice: </strong>{val.choice_id}</li>
                                                </ul>
                                            </div>
                                        )
                                    })
                                    :
                                    null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Nlp