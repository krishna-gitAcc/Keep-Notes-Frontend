import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

export const Login = (props) => {

    const url = 'https://inotebook-krishna.herokuapp.com/api/auth/login'

    let navigate = useNavigate();

    const [credential, setCredential] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault()
        handleClick();
    }
    const handleClick = async () => {
        const response = await fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email: credential.email, password: credential.password })
        });
        // console.log(credential.email, credential.password)

        const json = await response.json();
        // console.log(json);

        if(json.success){
            //redirect
            localStorage.setItem('token', json.authToken);
            // console.log(localStorage.getItem('token'));
            navigate('/home');
            props.showAlert("LogIn Successfully", "success")

        }else{
            props.showAlert(" Invalid Credentails", "danger")
        }

    }


    const onChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className='container mt-4'>
                <h2 className='mx-2 my-3'>Login to iNoteBook</h2>
                <form className='container' onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control" id="email" value={credential.email} name='email' aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" value={credential.password} name='password' placeholder="Password" onChange={onChange} minLength={5} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>

        </>
    )
}
