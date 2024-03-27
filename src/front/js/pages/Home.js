import React from "react";
import "../../styles/home.css";
import { useContext, useState } from "react";
import { AppContext } from "../layout";
import { useNavigate } from "react-router-dom";

export const Home = () => {

    return (
        <div className="container">
            <div className="row">
                <div className="col-4"></div>
                <div className="col-4 d-flex flex-column justify-content-center text-light text-center mt-5 ">
                    <h2 className="p-2">You are logged in</h2>
                    <button type="button" className="btn btn-danger">Log Out</button>
                </div>
                <div className="col-4"></div>
            </div>
        </div>
    )

}
