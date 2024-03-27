import React from "react";
import "../../styles/home.css";
import { useContext, useState } from "react";
import { AppContext } from "../layout";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Home = () => {
    const { store, actions } = useContext(Context)

    const navigate = useNavigate()

    const logOut = () => {
        sessionStorage.removeItem("loginKey")
        actions.setToken(null)
        navigate("/")
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4 d-flex flex-column justify-content-center text-light text-center mt-5 ">
                    <h2 className="p-2">{store.token ? "You are logged in" : "You need to log in"}</h2>
                    <button type="button" className={store.token ? "btn btn-danger" : "btn btn-success"} onClick={() => { logOut() }}>{store.token ? "Logout" : "Login"}</button>
                </div>
                <div className="col-4"></div>
            </div>
        </div>
    )

}
