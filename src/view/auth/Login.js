import React from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (data) => {
      let errors = {};

      // ===== row first =======
      if (!data.email) {
        errors.email = "Please enter email id.";
      }
      if (!data.password) {
        errors.password = "Please enter password.";
      }

      return errors;
    },
    onSubmit: (data) => {
      loginUser(data);
    },
  });
  const isLoginFormFieldValid = (name) =>
    !!(loginFormik.touched[name] && loginFormik.errors[name]);
  const getLoginFormErrorMessage = (name) => {
    return (
      isLoginFormFieldValid(name) && (
        <small className="p-error">{loginFormik.errors[name]}</small>
      )
    );
  };

  const loginUser = async (data) => {
    const postData = {
      email: data.email,
      password: data.password
    }
    await axios
      .post(`http://localhost:8000/api/login`, postData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        })
      .then((res) => {
        const dt = res.data;
        localStorage.setItem("loginInfo", JSON.stringify(dt))
        navigate('/users-list')
        // console.log("Login Info: ", dt)
        console.log("Successfully Logged In.");
      })
      .catch((err) => {
        console.log(err);
      })
  }
  return (
    <div className='body-divout'>
      <div className='body-divin'>
      <div className='my-5 d-flex flex-column justify-content-center align-items-center text-center'>
        <h3>Welcome</h3>
        <small>To</small>
        <h3 className='text-info'>Lets Chat</h3>
      </div>
      <form onSubmit={loginFormik.handleSubmit}>
        <div style={{ marginTop: "20px" }}>
          <input type="text" id='email' value={loginFormik.values.email}
            onChange={loginFormik.handleChange}
            placeholder='Email'
            style={{ marginRight: "20px" }}
            className='form-control'
          />
          <input type="text" id='password' value={loginFormik.values.password}
            onChange={loginFormik.handleChange}
            placeholder='Password'
            maxLength={10}
            className='form-control mt-3'
          />
        </div>

        <div style={{ display: "flex", marginTop: "20px" }}>
          <button type='button' style={{ marginRight: "20px" }}
            onClick={() => {
              loginFormik.resetForm();
            }}
            className="btn btn-secondary"
          >Cancel</button>
          <button type='submit' className="btn btn-primary">Save</button>
        </div>
        <div className='pointer mt-3' onClick={() => navigate('/register')}>Don't have an account?</div>
      </form>
      </div>
    </div>
  )
}

export default Login