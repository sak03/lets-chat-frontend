import axios from 'axios';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Users = () => {
    const navigate = useNavigate();
    const loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
    useEffect(()=>{
        getUsersList()
    },[])

    const getUsersList = async () => {
        await axios
            .get(`http://localhost:8000/api/users/friends`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${loginInfo?.token}`
                    },
                })
            .then((res) => {
                const dt = res.data;
                // localStorage.setItem("loginInfo", JSON.stringify(dt))
                console.log("users list: ", dt)
                // console.log("Successfully Logged In.");
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const logout = ()=>{
        localStorage.removeItem('loginInfo');
        navigate('/')
    }
  return (
    <div className='d-flex mt-5 p-5'>
          <span>Users</span>
          <span onClick={logout} className='mx-5'>Log out</span>
    </div>
  )
}

export default Users