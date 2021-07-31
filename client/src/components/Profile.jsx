import React, { useEffect, useState } from 'react';
import { useHistory,NavLink } from 'react-router-dom';
import axios from 'axios';
import Cnavbar from './Cnavbar';

function Profile() {
  const [name,setName]=useState("");
  const [phone,setPhone]=useState("");
  const [email,setEmail]=useState("");
  const [bloodG,setBloodG]=useState("");
  const [doctor,setDoctor]=useState([{
    name:""
  }]);
  const [param1,setParam1]=useState([{
    val:""
  }]);
  const [param2,setParam2]=useState([{
    val:""
  }]);
  const [info,setInfo]=useState("");
  const [userID,setUserID]=useState("");
  const [uimg,setUimg]=useState("");
  const [updatedAt,setUpdatedAt]=useState("");
  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }
  }, [history]);

  const getUser = async () => {
    if (localStorage.getItem("authToken")) {
        try {
            const config = {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
              };
            const {data}=await axios.get("/api/private",config);
            setName(data.user.username);
            setPhone(data.user.phone)
            setEmail(data.user.email)
            setBloodG(data.user.bloodGroup)
            setParam1(data.user.param1)
            console.log(data.user.param1);
            setParam2(data.user.param2)
            setInfo(data.user.moreInfo)
            setUserID(data.user.userID)
            setUimg(data.user.image)
            setDoctor(data.user.doctor)
            setUpdatedAt((data.user.updatedAt).substr(0,10))
        } catch (err) {
            console.log(err)
        }
    }
}

let liParam1=[{
  val:"No data"
}]
let liParam2=[{
  val:"No data"
}]
useEffect(()=>{
    getUser();
  },[history])
  liParam1=param1.filter(obj=>obj.val<1000);
  liParam2=param2.filter(obj=>obj.val<1000);



  return (
    <>
      <Cnavbar />
      <div className="row py-5 px-4 ">
        <div className="col-md-5 mx-auto">
          <div className="bg-white shadow rounded overflow-hidden">
            <div className="px-4 pt-0 pb-4 cover">
              <div className="media align-items-end profile-head bg-danger">
                <div className="profile mr-3"><img src={uimg} alt="Profile photo" width="130" className="rounded mb-2 img-thumbnail" /><div className="list-inline-item ml-2 text-center d-block">
                  <h5 className="font-weight-bold mb-0 d-block text-white">{userID}</h5><small className="" style={{color:"rgba(255, 255, 255, 0.719)"}}> <i className="fas fa-user mr-1 small"></i>User ID</small>
                </div></div>
                <div className="media-body mb-5 text-white">
                  <h4 className="mt-0 mb-0">{name}</h4>
                  <p className="lead mb-4" style={{color:"rgba(255, 255, 255, 0.719)"}}>Name</p>
                </div>
              </div>
            </div>
            <div className="bg-light p-4 d-flex justify-content-end text-center">
              <ul className="list-inline mb-0">
                <li className="list-inline-item">
                  <h5 className="font-weight-bold mb-0 d-block"><NavLink exact to='/editprofile' className="btn  btn-danger btn-block">Edit profile</NavLink></h5>
                </li>
                <li className="list-inline-item">
                  <h5 className="font-weight-bold mb-0 d-block"><NavLink exact to={`/variation/${userID}`} className="btn  btn-danger btn-block">Variation</NavLink></h5>
                </li>
              </ul>
            </div>
            <div className="px-4 py-3">
              <h5 className="mb-0 text-center text-danger h3 border rounded border-danger"><strong>Details</strong></h5>
              <div className="p-4 rounded shadow-sm bg-light userdet text-center">
                <p className="font-italic mb-0"><strong className="text-danger">Phone: </strong>{phone}</p>
                <p className="font-italic mb-0"><strong className="text-danger">Email: </strong>{email}</p>
                <p className="font-italic mb-0"><strong className="text-danger">Blood group: </strong>{bloodG?bloodG:"No recent data"}</p>
                <p className="font-italic mb-0"><strong className="text-danger">Blood pressure: </strong>{liParam1[(liParam1.length)-1]?liParam1[(liParam1.length)-1].val:"No recent data"}</p>
                <p className="font-italic mb-0"><strong className="text-danger">Blood sugar: </strong>{liParam2[(liParam2.length)-1]?liParam2[(liParam2.length)-1].val:"No recent data"}</p>
                <p className="font-italic mb-0"><strong className="text-danger">More info: </strong>{info?info:"No recent data"}</p>
                <p className="font-italic mb-0"><strong className="text-danger">Doctor assigned: </strong>{doctor?doctor.name:"No recent data"}</p>
                <p className="font-italic mb-0"><strong className="text-danger">Last updated: </strong>{updatedAt?updatedAt:"No recent data"}</p>
              </div>
            </div>
            {/* <div className="py-4 px-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="mb-0">Recent photos</h5><a href="#" className="btn btn-link text-muted">Show all</a>
              </div>
              <div className="row">
                <div className="col-lg-6 mb-2 pr-lg-1"><img src="https://images.unsplash.com/photo-1469594292607-7bd90f8d3ba4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="" className="img-fluid rounded shadow-sm" /></div>
                <div className="col-lg-6 mb-2 pl-lg-1"><img src="https://images.unsplash.com/photo-1493571716545-b559a19edd14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="" className="img-fluid rounded shadow-sm" /></div>
                <div className="col-lg-6 pr-lg-1 mb-2"><img src="https://images.unsplash.com/photo-1453791052107-5c843da62d97?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" alt="" className="img-fluid rounded shadow-sm" /></div>
                <div className="col-lg-6 pl-lg-1"><img src="https://images.unsplash.com/photo-1475724017904-b712052c192a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="" className="img-fluid rounded shadow-sm" /></div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile