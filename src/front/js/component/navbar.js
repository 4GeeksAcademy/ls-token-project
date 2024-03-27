import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../layout";
import { useContext, useState } from "react";
import { Context } from "../store/appContext";


export const Navbar = () => {
	//Global hooks
	const { store, actions} = useContext(Context)


	return (
		<nav className="navbar navbar-light bg-light" style={{ display: store.token ? "block" : "none" }}>
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
