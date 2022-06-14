import React, {useEffect, useState} from "react";
import "./App.css";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import Axios from "axios";

import { Crud } from "./pages/crud";
import { Registration } from "./pages/registration";
import { Login } from "./pages/login";
import { AuthContext } from "./helper/AuthContext";

export const App = () => {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    Axios
    .get("http://localhost:3001/api/isUserAuth", {
        headers: {
            "x-access-token": localStorage.getItem("token"),
        },
    })
    .then((response) => {
        if(!response.data.auth){
            setAuthState(false);
            console.log("だめ: " + response);
        } else {
            setAuthState(true);
            console.log("OK: " + response);
        }
    });
  }, []);
  return (
    <div>
      <BrowserRouter>
        <AuthContext.Provider value={{authState, setAuthState}}>
            <div className="navbar">
                <Link to="/">Home</Link>
                {!authState && (
                <>
                    <Link to="/registration">Register</Link>
                    <Link to="/login">Login</Link>
                </>
                )}
            </div>
            <Switch>
                <Route exact path="/">
                <Crud />
                </Route>
                <Route exact path="/registration">
                <Registration />
                </Route>
                <Route exact path="/Login">
                <Login />
                </Route>
            </Switch>
        </AuthContext.Provider>
      </BrowserRouter>
    </div>
  );
}