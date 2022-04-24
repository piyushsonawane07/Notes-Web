import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Signup(props) {

    let history = useHistory();

    const [creds, setCreds] = useState({
        name: "",
        email: "",
        "password": "",
        "cpassword": ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (creds.password !== creds.cpassword) {
            props.setAlertState("Passwords did not match !", "danger")
        } else {
            const url = "http://localhost:5000/api/auth/createuser";
            props.setProgress(20);
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: creds.name, email: creds.email, password: creds.password })
            });
            props.setProgress(60);
            const json = await response.json();
            console.log(json);
            props.setProgress(100);
            if (json.success) {
                localStorage.setItem('token', json.authToken);
                history.push("/");
            } else {
                props.setAlertState("User Already Exist !", "danger");
            }
        };

    }


    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }


    return (
        <div className="row">
            <div className="conatiner mt-5 col-md-6">
                <h2 className="fw-bold mb-4">Signup to iNotes</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-bold">Name</label>
                        <input type="text" value={creds.name} className="form-control" id="name" name="name" aria-describedby="nameHelp" onChange={onChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-bold">Email address</label>
                        <input type="email" value={creds.email} className="form-control" id="email" name="email" aria-describedby="emailHelp" onChange={onChange} required />
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label fw-bold">Password</label>
                        <input type="password" value={creds.password} className="form-control" name="password" id="password" onChange={onChange} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label fw-bold">Confirm Password</label>
                        <input type="password" value={creds.cpassword} className="form-control" name="cpassword" id="cpassword" onChange={onChange} required />
                    </div>
                    <button type="submit" className="btn btn-dark text-warning fw-bold">Signup</button>
                </form>
            </div>
        </div>
    )
}
