import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import injectContext from "./store/appContext";

import { Login } from "./pages/Login";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Createuser } from "./pages/CreateAccount";
import { Home } from "./pages/Home";
export const AppContext = React.createContext();

//create your first component
const Layout = () => {
    //Setup
    const basename = process.env.BASENAME || "";
    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;
    //Global state //ADD to "value" on app context
    const [currentUser, setCurrentUser] = useState("")
    const [token, setToken] = useState("")
    const [logIn, setLogIn] = useState(false)
    //Fetches as Functions


    return (
        <div>
            <AppContext.Provider value={{ currentUser, setCurrentUser, logIn, setLogIn, token, setToken }}>
                <BrowserRouter basename={basename}>
                    <ScrollToTop>
                        <Navbar />
                        <Routes>
                            <Route element={<Login />} path="/" />
                            <Route element={<Createuser />} path="/createuser" />
                            <Route element={<Home />} path="/home" />
                            <Route element={<h1>Not found!</h1>} />
                        </Routes>
                        <Footer />
                    </ScrollToTop>
                </BrowserRouter>
            </AppContext.Provider>

        </div>
    );
};

export default injectContext(Layout);
