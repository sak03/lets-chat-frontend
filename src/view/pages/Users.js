import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaCircle, FaRegUserCircle, FaUserAlt } from "react-icons/fa";

const Users = () => {
    const navigate = useNavigate();
    const loginInfo = JSON.parse(localStorage.getItem('loginInfo'));
    const [allUsers, setAllUsers] = useState(null)
    useEffect(() => {
        // getUsersList();
        getAllUsersList()
    }, []);

    // console.log("allUsers", allUsers)

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
    const getAllUsersList = async () => {
        await axios
            .get(`http://localhost:8000/api/users/all`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        // Authorization: `Bearer ${loginInfo?.token}`
                    },
                })
            .then((res) => {
                const dt = res.data.users;
                const ndt = dt.filter((item) => item.email !== loginInfo?.email)
                setAllUsers(ndt)
            })
            .catch((err) => {
                console.log(err);
            })
    }
    const logout = () => {
        localStorage.removeItem('loginInfo');
        navigate('/')
    }
    return (
        <div className='mt-3 p-5'>
            <div className='d-flex bg-white justify-content-between border-bottom px-3 py-2' style={{ position: "fixed", top: "3px", width: "90%" }}>
                <h3 className='text-info'>Lets Chat</h3>
                <h5><FaUserAlt /> {loginInfo?.name}</h5>
            </div>
            <div className='d-flex justify-content-between mt-3'>
                <h3>Friends</h3>
                <span onClick={logout} className='mx-5 pointer text-danger'>Log out</span>
            </div>
            <div>
                {allUsers && allUsers?.map((item) => {
                    return (
                        <div
                            key={item._id}
                            className='d-flex justify-content-between pointer p-3 shadow rounded mt-3'
                            onClick={() => {
                                localStorage.setItem('selectedUser', JSON.stringify(item));
                                navigate('/chating')
                            }}
                        >
                            <span>{item?.profilePic ? <img src='' alt='user profile' width={20} className='rounded-circle' /> : <FaRegUserCircle />}</span>
                            <span><FaCircle style={{fontSize:"5px"}} className={item.isOnline ? 'text-success mt-2' : 'text-danger mt-2'} /> {item.name}</span>
                            <span>{item.email}</span>
                            <span>{item.createdAt}</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Users