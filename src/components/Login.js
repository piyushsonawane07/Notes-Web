import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

export default function Login(props) {

    let history = useHistory();

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });


    async function handleLogin(e) {

        e.preventDefault();
        const url = "http://localhost:5000/api/auth/login";
        props.setProgress(20);
        const response = await fetch(url, {
            method: "POSt",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        props.setProgress(70);
        const json = await response.json();
        console.log(json);
        props.setProgress(100);
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            history.push("/");
            props.setAlertState("Login Successful", "success");
        } else {
            props.setAlertState("Invalid Credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <div className="row">
            <div className="container mt-5 col-md-12">
                <h2 className="fw-bold mb-4">Login to iNotes</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group col-md-4">
                        <label htmlFor="exampleInputEmail1" className="fw-bold">Email address</label>
                        <input type="email" value={credentials.email} className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={onChange} />
                        <small id="emailHelp" value={credentials.password} className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div class="form-group col-md-4 mt-2">
                        <label htmlFor="exampleInputPassword1" className="fw-bold">Password</label>
                        <input type="password" className="form-control" id="password" name="password" placeholder="Password" onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-dark text-warning fw-bold mt-4">Login</button>
                </form>
            </div>

        </div>
    )
}

