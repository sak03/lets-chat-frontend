import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Register from "./view/auth/Register";
import "bootstrap/dist/css/bootstrap.min.css";


const socket = io("http://localhost:5000");

const App = () => {
  const [userId, setUserId] = useState("USER_ID_HERE");
  const [receiverId, setReceiverId] = useState("RECEIVER_ID_HERE");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [viewMode, setViewMode] = useState(0)

  // useEffect(() => {
  //   socket.emit("join", userId);

  //   socket.on("receiveMessage", (data) => {
  //     setMessages((prev) => [...prev, data]);
  //   });

  //   return () => {
  //     socket.off("receiveMessage");
  //   };
  // }, [userId]);

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
      socket.emit("sendMessage", { senderId: userId, receiverId, message });
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Chat App</h2>
      <Register />
      {/* <div>
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
      <button onClick={sendMessage}>Send</button> */}
    </div>
  );
};

export default App;
