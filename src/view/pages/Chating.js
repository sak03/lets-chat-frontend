import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";
import { FaCircle, FaTelegramPlane, FaTimes, FaUserAlt } from "react-icons/fa";


const socket = io("http://localhost:5000");


const Chating = () => {
    const navigate = useNavigate();
    const loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
    const selectedUserInfo = JSON.parse(localStorage.getItem('selectedUser'));
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [receiverId, setReceiverId] = useState();
    // console.log('loginInfo', loginInfo)

    useEffect(() => {
        socket.emit("join", loginInfo?.userId);

        socket.on("receiveMessage", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, [loginInfo?.userId]);


    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("sendMessage", { senderId: loginInfo?.userId, receiverId: selectedUserInfo?._id, message });
            setMessage("");
        }
    };

    return (
        <div className='mt-3 p-5'>
            <div className='d-flex justify-content-between border-bottom'>
                <h3 className='text-info'>Lets Chat</h3>
                <h5><FaUserAlt /> {loginInfo?.name}</h5>
            </div>
            <div className='mt-3 d-flex justify-content-between shadow py-1 px-3'>
                <div className='d-flex'>
                <h4>{selectedUserInfo?.name}</h4>
                <small className={selectedUserInfo?.isOnline ? "text-success mx-3 my-2" : "text-danger mx-3 my-2"}>{selectedUserInfo?.isOnline ? "Active" : "Inactive"}</small>
                </div>
                <div>
                    <span className='pointer' onClick={() => navigate(-1)}><u><FaTimes /> Close</u></span>
                </div>
            </div>
            <div className='my-3 p-2'>
                {messages?.length > 0 ? messages.map((msg, index) => (
                    <p key={index}><strong>{msg.senderId}</strong>: {msg.message}</p>
                )) : <span className='my-3'>Message box is empty. Start conversation!</span>}
            </div>
            <div className='d-flex'>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className='form-control'
                />
                <button className='btn btn-primary' onClick={sendMessage}> <FaTelegramPlane /></button>
            </div>
        </div>
    )
}

export default Chating