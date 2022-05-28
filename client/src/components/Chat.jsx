import React, { useEffect, useState } from "react";
import axios from "axios";
import Cnavbar from './Cnavbar';
import './chat.css';

import Messages from "./Messages";
import { useHistory } from "react-router-dom";

const Chat = props => {

  const history = useHistory();
  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }
  }, [history]);
  
  const [user, setUser] = useState("");
  const [userID, setUserID] = useState("");
  
  const getUser = async () => {
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

  useEffect(() => {
    getUser();
  }, [history])


  const [responses, setResponses] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [text, setText] = useState("");

  const handleMessageSubmit = message => {
    const data = {
      message
    };

    axios
      .post("/chatbot", data)
      .then(response => {
        let resp = response.data.message.fulfillmentText;
        console.log(resp);
        const responseData = {
          text: response.data["message"]["fulfillmentText"] != "" ? response.data["message"]["fulfillmentText"] : "Sorry, I can't get it. Can you please repeat once?",
          isBot: true
        };

        setResponses(responses => [...responses, responseData]);
        if (resp.startsWith("Okay")) {
          let textsLi = resp.split(' ');
          const doctor=textsLi[6];
          const date=textsLi[8].substring(0,10);
          const time=textsLi[10];
          const config = {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          };
          axios.post(`/api/private/user/chat/${userID}/${doctor}/${date}/${time}`,config)
          .then(  
            setTimeout(() => {
               history.push('/');
             }, 3000)
           )
          .catch((err)=>{ history.push('/errordoctor')});
        }
      })
      .catch(error => {
        history.push('/errordoctor');
      });
    };
    
    const handleMessageChange = event => {
      setCurrentMessage(event.target.value);
    };
    
    const handleSubmit = event => {
      const message = {
        text: currentMessage,
        isBot: false
      };
      if (event.key == "Enter") {
        setResponses(responses => [...responses, message]);
        handleMessageSubmit(message.text);
        setCurrentMessage("");
      }
      
    };
    
    return (
      <>
        <Cnavbar/>
      <div className="chatSection">
      <div className="botContainer">
        <div className="messagesContainer bg-white">
          <Messages messages={responses} />
        </div>

        {/*The input section is 👇*/}
        <div className="inputSection">
          <input
            type="text"
            value={currentMessage}
            onChange={handleMessageChange}
            onKeyDown={handleSubmit}
            placeholder="Say something..."
            className="messageInputField"
          />
          <div onTap={handleSubmit}>
            <svg
              style={{ marginRight: "10px" }}
              id="Capa_1"
              enableBackground="new 0 0 512.004 512.004"
              height="25"
              viewBox="0 0 512.004 512.004"
              width="25"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="m511.35 52.881-122 400c-3.044 9.919-14.974 13.828-23.29 7.67-7.717-5.727-203.749-151.217-214.37-159.1l-142.1-54.96c-5.79-2.24-9.6-7.81-9.59-14.02.01-6.21 3.85-11.77 9.65-13.98l482-184c5.824-2.232 12.488-.626 16.67 4.17 3.37 3.87 4.55 9.24 3.03 14.22z"
                  fill="#94dfda"
                />
                <path
                  d="m511.35 52.881-122 400c-3.044 9.919-14.974 13.828-23.29 7.67l-190.05-141.05 332.31-280.84c3.37 3.87 4.55 9.24 3.03 14.22z"
                  fill="#61a7c5"
                />
                <path
                  d="m507.89 58.821-271.49 286.4-63 125.03c-3.16 6.246-10.188 9.453-16.87 7.84-6.76-1.6-11.53-7.64-11.53-14.59v-175.3c0-4.86 2.35-9.41 6.31-12.23l337-239.69c6.29-4.48 14.95-3.45 20.01 2.38 5.07 5.83 4.88 14.56-.43 20.16z"
                  fill="#eef4ff"
                />
                <path
                  d="m507.89 58.821-271.49 286.4-63 125.03c-3.16 6.246-10.188 9.453-16.87 7.84-6.76-1.6-11.53-7.64-11.53-14.59l31.01-144 332.31-280.84c5.07 5.83 4.88 14.56-.43 20.16z"
                  fill="#d9e6fc"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
      </>
  );
};

export default Chat;