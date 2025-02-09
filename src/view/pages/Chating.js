import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { io } from "socket.io-client";
import { FaTelegramPlane, FaTimes, FaUserAlt } from "react-icons/fa";
import axios from 'axios';

const socket = io("http://localhost:8000", {
    transports: ["websocket"],
    withCredentials: true,
});

const Chating = () => {
    const navigate = useNavigate();
    const loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
    const selectedUserInfo = JSON.parse(localStorage.getItem('selectedUser'));
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [prevMessages, setPrevMessages] = useState([])

    // console.log('prevMessages÷', prevMessages)

    useEffect(() => {
        if (selectedUserInfo?._id) {
            socket.emit("join", selectedUserInfo._id);
        }

        socket.on("receiveMessage", (data) => {
            // console.log("📩 Received message:", data); // Debugging
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, [selectedUserInfo?._id]);

    useEffect(() => {
        getAllMessages();
    }, [messages])

    const getAllMessages = async () => {
        if (!loginInfo?.userId || !selectedUserInfo?._id) return;

        try {
            const { data } = await axios.get(`http://localhost:8000/api/chat/chats/${loginInfo.userId}/${selectedUserInfo._id}`);
            setPrevMessages(data);
        } catch (error) {
            console.error("Error fetching chat history:", error);
        }
    };



    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("sendMessage", { senderId: loginInfo?.userId, receiverId: selectedUserInfo?._id, message });
            setMessage("");
        }
    };

    return (
        <div className='mt-3 p-5'>
            <div className='d-flex justify-content-between border-bottom bg-white px-3 py-2' style={{ position: "fixed", top: "3px", width: "90%" }}>
                <h3 className='text-info'>Lets Chat</h3>
                <h5><FaUserAlt /> {loginInfo?.name}</h5>
            </div>
            <div className='mt-3 d-flex bh-white justify-content-between shadow py-1 px-3' style={{ position: "sticky", top: "3.65rem", width: "100%" }}>
                <div className='d-flex'>
                    <h4>{selectedUserInfo?.name}</h4>
                    <small className={selectedUserInfo?.isOnline ? "text-success mx-3 my-2" : "text-danger mx-3 my-2"}>{selectedUserInfo?.isOnline ? "Active" : "Inactive"}</small>
                </div>
                <div>
                    <span className='pointer' onClick={() => navigate(-1)}><u><FaTimes /> Close</u></span>
                </div>
            </div>
            <div className='my-3 p-2'>
                {prevMessages?.length > 0 ? [...prevMessages, ...messages].map((msg, index) => (
                    <p key={index} className={msg.receiverId !== selectedUserInfo._id ? "p-3 my-1 bg-light rounded" : 'p-3 my-1 d-flex justify-content-end'}><span>{msg.message}</span></p>
                )) : <span className='my-3'>Message box is empty. Start conversation!</span>}
            </div>
            <div className='d-flex bg-white' style={{position:"fixed",bottom:"5px", width:"80%"}}>
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