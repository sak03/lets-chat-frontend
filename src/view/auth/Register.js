
import React from 'react';
import axios from 'axios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate()
    const registerFormik = useFormik({
        initialValues: {
            fName: "",
            lName: "",
            email: "",
            password: "",
        },
        validate: (data) => {
            let errors = {};

            // ===== row first =======
            if (!data.fName) {
                errors.fName = "Please enter first name.";
            }
            if (!data.lName) {
                errors.lName = "Please enter last name.";
            }
            if (!data.email) {
                errors.email = "Please enter email id.";
            }
            if (!data.password) {
                errors.password = "Please enter password.";
            }

            return errors;
        },
        onSubmit: (data) => {
            registerUser(data);
            // registerFormik.resetForm();
            // setViewMode(0);
            // console.log("Formik Data", data)
        },
    });
    const isRegisterFormFieldValid = (name) =>
        !!(registerFormik.touched[name] && registerFormik.errors[name]);
    const getRegisterFormErrorMessage = (name) => {
        return (
            isRegisterFormFieldValid(name) && (
                <small className="p-error">{registerFormik.errors[name]}</small>
            )
        );
    };

    const registerUser = async (data) => {
        const postData = {
            name: `${data.fName} ${data.lName}`,
            email: data.email,
            password: data.password
        }
        await axios
            .post(`http://localhost:8000/api/register`, postData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
            .then((res) => {
                const dt = res.data;
                navigate('/')
                console.log("User created successfully");
            })
            .catch((err) => {
                console.log(err);
            })
    }


    return (
        <div className='body-divout'>
            <div className='body-divin'>
            <div className='my-5 d-flex flex-column justify-content-center align-items-center text-center'>
                <h3>Be The Part</h3>
                <small>of</small>
                <h3 className='text-info'>Lets Chat</h3>
            </div>
            <form onSubmit={registerFormik.handleSubmit}>

                <div style={{ marginTop: "20px" }}>
                    <input type="text" id='fName' value={registerFormik.values.fName}
                        onChange={registerFormik.handleChange}
                        placeholder='First Name'
                        style={{ marginRight: "20px" }}
                        className='form-control mt-3'
                    />
                    <input type="text" id='lName' value={registerFormik.values.lName}
                        onChange={registerFormik.handleChange}
                        placeholder='First Name'
                        className='form-control mt-3'
                    />
                </div>
                <div style={{ marginTop: "20px" }}>
                    <input type="text" id='email' value={registerFormik.values.email}
                        onChange={registerFormik.handleChange}
                        placeholder='Email'
                        style={{ marginRight: "20px" }}
                        className='form-control mt-3'
                    />
                    <input type="text" id='password' value={registerFormik.values.password}
                        onChange={registerFormik.handleChange}
                        placeholder='Password'
                        maxLength={10}
                        className='form-control mt-3'
                    />
                </div>
                <div style={{ display: "flex", marginTop: "20px" }}>
                    <button type='button' style={{ marginRight: "20px" }}
                        onClick={() => {
                            navigate('/')
                            registerFormik.resetForm();
                        }}
                        className="btn btn-secondary"
                    >Cancel</button>
                    <button type='submit' className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
        </div>
    )
}

export default Register