import React from "react";
import "../../styles/home.css";
import { useContext, useState } from "react";
import { AppContext } from "../layout";
import { useNavigate } from "react-router-dom";

export const Createuser = () => {

    //Local Hooks to Capture User Input
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("")
    const [errorMsg, setErrorMsg] = useState("")

    //Functions
    const parentFunction = () => {
        if (password == passwordCheck) {
            let dataOut = { "email": username, "password": password }
            fetch((`https://crispy-engine-r44qp959gjp525vxw-3001.app.github.dev/api/newuser`), {
                method: 'POST',
                body: JSON.stringify(dataOut),
                //  Authorization: 'JWT '+token,
                headers: {
                    'Content-Type': 'application/json',
                }
            })
                .then(res => {
                    if (!res.ok) throw Error(res.statusText);
                    return res.json();
                })
                .then(response => {
                    console.log('Success:', response)
                    if (response.bad_message) {
                        setErrorMsg(response.bad_message)
                        setPassword("")
                        setPasswordCheck("")
                    } else {
                        setUsername("")
                        setPassword("")
                        setPasswordCheck("")
                        setErrorMsg("")
                    }

                })
                .catch(error => console.error(error));

        }
        else {
            setErrorMsg(`Passwords don't match, try again`)
            setPassword("")
            setPasswordCheck("")
            return null
        }
    }

    return (
        <div className="container mt-5">
            <div className="col-3"></div>
            <div className="col">
                <div className="alert alert-danger" role="alert" style={{ display: errorMsg == "" ? "none" : "block" }}>
                    {errorMsg}
                </div>
                <form>
                    <div className="mb-3 text-light">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={username} onChange={(e) => { setUsername(e.target.value) }} />
                    </div>
                    <div className="mb-3 text-light">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <div className="mb-3 text-light">
                        <label htmlFor="exampleInputPassword1" className="form-label">Confirm</label>
                        <input type="password" className="form-control" id="exampleInputPassword2" value={passwordCheck} onChange={(e) => { setPasswordCheck(e.target.value) }} />
                    </div>
                    <button type="button" className="btn btn-primary" onClick={() => { parentFunction() }}>Submit</button>
                </form>
            </div>
            <div className="col-3"></div>

        </div>
    )
}