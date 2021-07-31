import React, { useEffect, useState } from 'react';
import './editprofile.css';
import Cnavbar from './Cnavbar';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function Editprofile() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [bloodG, setBloodG] = useState("");
  const [param1, setParam1] = useState([]);
  const [param2, setParam2] = useState([]);
  const [info, setInfo] = useState("");
  const [userID, setUserID] = useState("");

  const [nBloodG, setNBloodG] = useState("");
  const [nParam1, setNParam1] = useState("");
  const [nParam2, setNParam2] = useState("");
  const [nInfo, setNInfo] = useState("");
  const [nImg,setNImg]=useState("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTOkHm3_mPQ5PPRvGtU6Si7FJg8DVDtZ47rw&usqp=CAU");


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
        const { data } = await axios.get("/api/private", config);
        setName(data.user.username);
        setPhone(data.user.phone)
        setEmail(data.user.email)
        setBloodG(data.user.bloodGroup)
        setParam1(data.user.param1.val)
        setParam2(data.user.param2.val)
        setInfo(data.user.moreInfo)
        setUserID(data.user.userID)
        
        setNImg(data.user.image)
        if(data.user.bloodGroup) setNBloodG(data.user.bloodGroup);
        setNInfo(data.user.moreInfo)
        console.log(data.user);
      } catch (err) {
        history.push('/error');
        console.log(err)
      }
    }
  }
  useEffect(() => {
    getUser();
  }, [history])

const postData=async(e)=>{
  e.preventDefault();
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    const {data}=await axios.post(`/api/private//user/${userID}/edit`,{
      username:name,
      phone:phone,
      email:email,
      bloodGroup:nBloodG,
      params1:nParam1,
      params2:nParam2,
      moreInfo:nInfo,
      image:nImg
    },
    config
    )
    history.push('/profile');
  } catch (err) {
    console.log(err)
  }
}


const uploadImage=async(e)=>{
  const file=e.target.files[0];
  const base64=await convertBase64(file);
  setNImg(base64.toString());
}

const convertBase64=(file)=>{
  return new Promise((resolve,reject)=>{
    const fileReader=new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload=()=>{
      resolve(fileReader.result);
    }
    
    fileReader.onerror=(err)=>{
      reject(err);
    }
  })
}

const deleteProfile=async()=>{
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };
    await axios.delete(`/api/private/user/${userID}/delete`,config);
    localStorage.removeItem('authToken');
    history.push('/signup');
  } catch (err) {
    console.log(err)
    history.push('/error');
  }
}

console.log(nImg);
  return (
    <>
      <Cnavbar />
      <form method="POST" onSubmit={postData}>
        <div className="container rounded bg-white mt-5 mb-5">
          <div className="row">
            <div className="col-md-5 border-right">
              <div className="d-flex flex-column align-items-center text-center p-3 py-5"><img className="rounded mt-5" src={nImg}  style={{width:"80%"}}/><span className="font-weight-bold">Upload image</span><input type="file" className="text-center form-control" onChange={(e)=>{uploadImage(e)}}/></div>
            </div>
            <div className="col-md-7 border-right">
              <div className="p-3 py-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h4 className="text-right">Profile Settings</h4>
                </div>
                <div className="row mt-2">
                  <div className="col-md-12"><label className="labels" readOnly>Full name</label><input type="text" className="form-control" placeholder="Full name" value={name} /></div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12"><label className="labels">Blood pressure</label><input type="text" className="form-control" placeholder="Blood pressure" value={nParam1} onChange={(e)=>setNParam1(e.target.value)} /></div>
                  <div className="col-md-12"><label className="labels">Blood sugar</label><input type="text" className="form-control" placeholder="Blood sugar" value={nParam2} onChange={(e)=>setNParam2(e.target.value)} /></div>
                  <div className="col-md-12"><label className="labels">Blood group</label><input type="text" className="form-control" placeholder="Blood group" value={nBloodG} onChange={(e)=>setNBloodG(e.target.value)}/></div>
                  <div className="col-md-12"><label className="labels">More info</label><textarea type="text" className="form-control" placeholder="More info" value={nInfo} onChange={(e)=>setNInfo(e.target.value)} rows="6" /></div>
                </div>
                {/* <div className="row mt-3">
                <div className="col-md-6"><label className="labels">Country</label><input type="text" className="form-control" placeholder="country" defaultValue /></div>
                <div className="col-md-6"><label className="labels">State/Region</label><input type="text" className="form-control" defaultValue placeholder="state" /></div>
              </div> */}
                <div className="mt-5 text-center"><button className="btn btn-primary profile-button btn-outline-success" type="submit">Save Profile</button></div>
                <div className="mt-5 text-center"><Button variant="outlined" color="secondary" className="profile-button float-right" onClick={handleClickOpen}>Delete profile</Button></div>
              </div>
            </div>
            {/* <div className="col-md-4">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center experience"><span>Edit Experience</span><span className="border px-3 p-1 add-experience"><i className="fa fa-plus" />&nbsp;Experience</span></div><br />
              <div className="col-md-12"><label className="labels">Experience in Designing</label><input type="text" className="form-control" placeholder="experience" defaultValue /></div> <br />
              <div className="col-md-12"><label className="labels">Additional Details</label><input type="text" className="form-control" placeholder="additional details" defaultValue /></div>
            </div>
          </div> */}
          </div>
        </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Do you surely want to delete your account ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            All the datas will be deleted permanently !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
          <Button onClick={deleteProfile} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      </form>
    </>
  )
}

export default Editprofile
