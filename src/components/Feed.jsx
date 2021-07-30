import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cnavbar from './Cnavbar';
import Card from './feedfiles/Card';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Card2 from './feedfiles/Card2';

function Feed() {
    const [li, setLi] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [id,setId]=useState("");
    const [li2,setLi2]=useState([]);

    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");

    const history = useHistory();

    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
            history.push('/login');
        }
    }, [history])

    const uploadPost = async (e) => {
        e.preventDefault();
        try {
            if (!localStorage.getItem("authToken")) {
                history.push('/login');
            }
            else if (title.trim() !== "" || details.trim() !== "") {
                let content = details;
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                };
                await axios.post('/api/private/postNeed', { content,title }, config);
                const { data } = await axios.get('/api/private/getMyPost', config);
                setLi2(data);
                setDetails("");
                setTitle("");
                console.log(li);
                console.log(li.length);
                window.alert('Post created!');
            }
            else {
                window.alert("Please enter all the details!");
            }
        } catch (error) {
            console.log(error);
            window.alert('Something went wrong!');
        }
    }


    const getPosts = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            };
            const { data } = await axios.get('/api/private/getOthersPost', config);
            setLi(data);
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }

    const getMyPosts = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            };
            const { data } = await axios.get('/api/private/getMyPost', config);
            setLi2(data);
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    }

    const accept = async () => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            };
            console.log(id);
            await axios.delete(`api/private/postNeed/accept/${id}`, config)
            const { data } = await axios.get('/api/private/getOthersPost', config);
            setLi(data);
            setOpen(false);
        } catch (error) {
            window.alert('Can not accept!');
        }
    }
    useEffect(() => {
        getPosts();
        getMyPosts();
    }, [history])

    const handleClickOpen = (id) => {
        setOpen(true);
        setId(id);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleClickOpen2 = (id) => {
        setOpen2(true);
        setId(id);
    };

    const handleClose2 = () => {
        setOpen2(false);
    };

    const deletePost=async()=>{
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            };
            console.log(id);
            await axios.delete(`api/private/postNeed/delete/${id}`,config);
            const { data } = await axios.get('/api/private/getMyPost', config);
            setLi2(data);
            setOpen2(false);

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Cnavbar />
            <form method="POST" className="container-fluid d-flex align-items-center justify-content-center flex-column pt-2 pb-4 text-white" style={{ backgroundColor: "rgba(255, 255, 255, 0.767)", minHeight: "90vh" }} onSubmit={uploadPost}>
                <div className="col-lg-4 col-md-8 col-sm-12 col-12 bg-danger p-4 animate__animated animate__backInDown border rounded">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Title: </label>
                        <input type="text" className="form-control text-center" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter requirement(s)" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlTextarea1">Patient's details: </label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="6" value={details} onChange={(e) => setDetails(e.target.value)}></textarea>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-danger float-right border border-danger rounded-circle text-white pb-0 pl-2 pr-2"><AddCircleOutlineIcon style={{ fontSize: "40px" }} /></button>
                    </div>
                </div>
            </form>
            <div className="container-fluid" style={{ backgroundColor: "rgba(255, 255, 255, 0.767)" }}>
            <h1 className="bg-danger h1 text-center text-white w-50 mx-auto py-2">My posts</h1>
                <div className="row d-flex align-items-center justify-content-center  animate__animated animate__bounceIn">
                    {li2.length ? li2.map((val, ind) => {
                        return <Card2 title={val.title} username={val.postedBy.username} details={val.content} key={val._id} id={val._id} onSelect={handleClickOpen2} />
                    }) : <><h1 className="h4 text-center text-danger mx-auto py-5">You have not created any post yet!</h1></>}
                </div>
            </div>
            <div className="container-fluid" style={{ backgroundColor: "rgba(255, 255, 255, 0.767)" }}>
            <h1 className="bg-danger h1 text-center text-white w-50 mx-auto py-2">Other posts</h1>
                <div className="row d-flex align-items-center justify-content-center  animate__animated animate__bounceIn">
                    {li.length ? li.map((val, ind) => {
                        return <Card title={val.title} username={val.postedBy.username} details={val.content} key={val._id} id={val._id} onSelect={handleClickOpen} />
                    }) : <><h1 className="h4 text-center text-danger mx-auto py-5">Sorry, we don't have any post to show!</h1></>}
                </div>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Do you surely want to accept this ?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        For further conversations, check your mail.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Close
                    </Button>
                    <Button onClick={accept} color="secondary">
                        Accept
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={open2}
                onClose={handleClose2}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Do you surely want to delete this post ?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        All the informations will be deleted permanently!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose2} color="primary" autoFocus>
                        Close
                    </Button>
                    <Button onClick={deletePost} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Feed
