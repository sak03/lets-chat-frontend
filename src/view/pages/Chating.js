import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");


const Chating = () => {
    const loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [receiverId, setReceiverId] = useState("RECEIVER_ID_HERE");
    console.log('loginInfo', loginInfo)

    useEffect(() => {
        socket.emit("join", loginInfo?.userId);

        socket.on("receiveMessage", (data) => {
            setMessages((prev) => [...prev, data]);
        });

        return () => {
            socket.off("receiveMessage");
        };
    }, [loginInfo?.userId]);

    // const login = async () => {
    //   const response = await fetch("http://localhost:5000/api/login", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email, password }),
    //   });

    //   const data = await response.json();
    //   if (data.token) {
    //     localStorage.setItem("userId", data.userId);
    //     localStorage.setItem("token", data.token);
    //   }
    // };

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("sendMessage", { senderId: loginInfo?.userId, receiverId, message });
            setMessage("");
        }
    };

    // const sendMessage = () => { }

    return (
        <div>
            <h2>Chat App</h2>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}><strong>{msg.senderId}</strong>: {msg.message}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    )
}

export default Chating