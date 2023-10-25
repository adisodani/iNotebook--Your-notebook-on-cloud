import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem('token', json.authToken);
      navigate("/");
      props.showAlert("Account created successfully", "success")
    } else {
      props.showAlert("Please input valid credentials", "danger")
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  return (
    <div className="container mt-3">
      <h2 className="mb-3"> Sign up to use to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control my-2" id="name" name="name" onChange={onChange} aria-describedby="nameHelp" placeholder="Enter name" />
        </div>
        <div className="form-group my-2">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control my-2" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div className="form-group my-2">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control my-2" id="password" name="password" onChange={onChange} placeholder="Enter Password" minLength={5} required />
        </div>
        <div className="form-group my-2">
          <label htmlFor="cpassword">Confirm Password</label>
          <input type="password" className="form-control my-2" id="cpassword" name="cpassword" onChange={onChange} placeholder="Enter Password" minLength={5} required />
        </div>

        <button type="submit" className="btn btn-primary my-2">Sign Up</button>
      </form>
    </div>
  )
}

export default Signup
