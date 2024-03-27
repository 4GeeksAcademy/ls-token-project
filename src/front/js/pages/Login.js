import React, { useEffect } from "react";
import "../../styles/home.css";
import { useContext, useState } from "react";
import { AppContext } from "../layout";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Login = () => {
	//Global hooks
	const { currentUser, setCurrentUser, token, setToken } = useContext(AppContext)
	const { store, actions } = useContext(Context)

	//Local hooks
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const navigate = useNavigate()

	useEffect(() => {
		if (store.token) {
			navigate("/home")
		}
	});


	//Parent Function
	const logUserIn = () => {
		let usercredetials = {
			"email": username,
			"password": password
		}
		fetch((`https://crispy-engine-r44qp959gjp525vxw-3001.app.github.dev/api/token`), {
			method: 'POST',
			body: JSON.stringify(usercredetials),
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
				sessionStorage.setItem('loginKey', response.token)
				actions.setToken(sessionStorage.getItem('loginKey'))
				setCurrentUser(response.id)
				navigate("/home")
			})
			.catch(error => {
				setError('Password or Username is incorrect')
				console.error(error)
			});
	}





	return (
		<div className="container text-center" style={{ display: store.token ? "none" : "block" }}>
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
							<button type="button" className="btn btn-success m-1" onClick={() => { logUserIn() }}>Log in</button>
						</div>
					</div>
				</div>
				<div className="col"></div>
			</div>
		</div>
	)
}



