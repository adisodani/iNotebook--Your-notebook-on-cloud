import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials]= useState({email:"", password:""});
    let navigate= useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        if(json.success){
            //save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            props.showAlert("Logged in successfully", "success");
            navigate("/");
        }else{
            props.showAlert("invalid credentials", "danger");
        }
    }

    const onChange =(e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div className='mt-3'>
            <h2 className='mb-3'> Login to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control my-2" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" />                
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control my-2" value={credentials.password} onChange={onChange} id="password" name="password" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary my-3">Login</button>
            </form>
        </div>
    )
}

export default Login
