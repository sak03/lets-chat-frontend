import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoutes from "./view/auth/ProtectedRoutes";

const Login = React.lazy(() => import('./view/auth/Login'))
const Register = React.lazy(() => import('./view/auth/Register'))
const ChatingUI = React.lazy(()=> import('./view/pages/Chating'))
const Users = React.lazy(()=> import('./view/pages/Users'))


const App = () => {
  const [userId, setUserId] = useState("USER_ID_HERE");
  const [receiverId, setReceiverId] = useState("RECEIVER_ID_HERE");

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


  // const sendMessage = () => {
  //   if (message.trim()) {
  //     socket.emit("sendMessage", { senderId: userId, receiverId, message });
  //     setMessage("");
  //   }
  // };

  return (

    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Protected Route for Authenticated Users */}
          <Route element={<ProtectedRoutes />}>
            <Route path="/users-list" element={<Users />} />
            <Route path="/chating" element={<ChatingUI />} />
          </Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
};

export default App;
