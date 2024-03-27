import React from "react";
import "../../styles/home.css";
import { useContext, useState } from "react";
import { AppContext } from "../layout";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	//Global hooks
	const { currentUser, setCurrentUser } = useContext(AppContext)

	//Local hooks
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const navigate = useNavigate()





	return (
		<div className="container text-center">
			<div className="row align-items-center">
				<div className="col"></div>
				<div className="col p-5 bg-danger mt-5 border border-success">
					<div className="row" style={
						{ display: error ? "block" : "none" }
					}>
						<span>{error}</span>
					</div>
					<div className="row m-2">
						<div className="col h1 mb-2 text-success-emphasis">
							Contact List
						</div>
					</div>
					<div className="row m-2">
						<div className="col">
							<input type="email" className="form-control" id="colFormLabel" placeholder="Username" onChange={(e) => { setUsername(e.target.value) }} value={username} />
						</div>
					</div>
					<div className="row m-2">
						<div className="col">
							<input type="email" className="form-control" id="colFormLabel" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} value={password} />
						</div>
					</div>
					<div className="row m-2">
						<div className="col d-flex justify-content-center text-align-center">
							<button type="button" className="btn btn-light m-1" onClick={() => { navigate("/createuser") }}>New Account</button>
							<button type="button" className="btn btn-success m-1" onClick={() => { navigate("/home") }}>Log in</button>
						</div>
					</div>
				</div>
				<div className="col"></div>
			</div>
		</div>
	)
}



