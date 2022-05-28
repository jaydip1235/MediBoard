import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';
import { useHistory } from 'react-router-dom';
import Cnavbar from './Cnavbar';

const Disease = () => {

    const history = useHistory();

    const [symptoms, setSymptoms] = useState([]);
    const [selected, setSelected] = useState([]);
    const [sex, setSex] = useState("male");
    const [age, setAge] = useState("");
    const [conditions, setConditions] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem("authToken")) history.push('/login');
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'App-Id': process.env.REACT_APP_APP_ID,
                'App-Key': process.env.REACT_APP_API_KEY
            }
        }
        axios.get(`https://api.infermedica.com/v3/concepts?types=symptom`, config).then(({ data }) => {
            setSymptoms(data);
        }).catch((err) => console.log(err));
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
                sex,
                age: {
                    value: age
                },
                evidence: selected
            }
            const { data } = await axios.post(`https://api.infermedica.com/v3/diagnosis`, bodyData, config);
            setConditions(data.conditions);
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
                                <h4 className="text-right">Get disease from symptoms</h4>
                            </div>
                            <div className="row mt-3">
                                <div className="form-group">
                                    {/* <label htmlFor="age" className="col-sm-12 control-label">Age</label> */}
                                    <div className="col-sm-9">
                                        <input type="number" min='5'  value={age} onChange={(e) => setAge(e.target.value)} id="age" placeholder="Enter age" className="form-control" name="age" />
                                    </div>
                                </div>
                                <select
                                    onChange={(e) => setSex(e.target.value)}
                                    data-bs-toggle="tooltip"
                                    data-bs-placement="top"
                                    title="Gender"
                                    className="browser-default custom-select ps-2 theme-class w-50"
                                >
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    {/* {themes.map((thm) => (
                <option value={thm} key={thm}>
                  {thm}
                </option>
              ))} */}
                                </select>
                                {
                                    symptoms.length
                                        ?
                                        <Multiselect
                                            displayValue="name"
                                            className='w-100'
                                            onKeyPressFn={function noRefCheck() { }}
                                            onRemove={function noRefCheck(val) {
                                                let temp = [];
                                                val.forEach(e => {
                                                    temp.push({ id: e.id, choice_id: "present" });
                                                });
                                                setSelected(temp);
                                                console.log(temp);
                                            }}
                                            onSearch={function noRefCheck() { }}
                                            onSelect={function noRefCheck(val) {
                                                setSelected([...selected, { id: val[val.length - 1].id, choice_id: "present" }]);
                                                console.log(selected);
                                            }}
                                            options={symptoms}
                                            // selectedValues={[
                                            //   {
                                            //     cat: 'Group 1',
                                            //     key: 'Option 1'
                                            //   },
                                            //   {
                                            //     cat: 'Group 1',
                                            //     key: 'Option 2'
                                            //   }
                                            // ]}
                                            style={{
                                                option: {
                                                    background: 'red'
                                                },
                                                chips: {
                                                    background: 'red'
                                                },
                                                multiselectContainer: {
                                                    color: 'black',
                                                    border: 'none',
                                                    width: '100%'
                                                },
                                                searchBox: {
                                                    border: 'none'
                                                }
                                            }}
                                        />
                                        :
                                        null
                                }
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
                                                    <li style={{ listStyle: 'none' }}><strong>Probability: </strong>{val.probability}</li>
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

export default Disease