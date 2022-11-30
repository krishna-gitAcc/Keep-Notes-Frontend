import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";


export const SignUp = (props) => {

    let navigate = useNavigate();

    const url = "http://localhost:8000/api/auth/createuser"

    const [credential, setCredential] = useState({ name: "", email: "", password: "", cpassword: "" });

    const handleSubmit = async (e) => {
        e.preventDefault()
        handleClick();
    }
    const handleClick = async () => {
        const response = await fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password })
        });
        // console.log(credential.email, credential.password)

        const json = await response.json();
        console.log(json);

        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            props.showAlert("Account Created Successfully", "success")
            navigate('/login');
        } else {
            props.showAlert(" Some Error Occoured", "danger")
        }
        setCredential({ name: "", email: "", password: "", cpassword: "" })

    }


    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <>
            <section className="vh-100">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black">
                                <div className="card-body p-md-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                            <form className="mx-1 mx-md-4" onSubmit={handleSubmit} >

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label htmlFor="name">Name</label>
                                                        <input type="text" className="form-control" id="name" name='name' aria-describedby="name" placeholder="Enter Your Full Name" onChange={onChange} value={credential.name} required/>
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label htmlFor="email">Email address</label>
                                                        <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} value={credential.email} required />
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label htmlFor="password">Password</label>
                                                        <input type="password" className="form-control" id="password" name='password' aria-describedby="emailHelp" placeholder="Enter your password" onChange={onChange} value={credential.password} minLength={5} required />
                                                    </div>
                                                </div>
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label htmlFor="cpassword">Confirm Password</label>
                                                        <input type="password" className="form-control" id="cpassword" name='cpassword' aria-describedby="emailHelp" placeholder="Confirm your password" onChange={onChange} value={credential.cpassword} minLength={5} required />
                                                    </div>
                                                </div>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="submit" className="btn btn-primary btn-lg">Register</button>
                                                </div>

                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
