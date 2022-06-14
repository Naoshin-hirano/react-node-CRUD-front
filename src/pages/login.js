import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import '../App.css';
import Axios from "axios";
import {AuthContext} from "../helper/AuthContext";

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setAuthState} = useContext(AuthContext);
  // axios使ってAPI通信をするとき、 リクエストに Cookie を添えて送信するために withCredentials オプションを有効にする
  Axios.defaults.withCredentials = true;

  let history = useHistory();

  const login = () => {
    Axios.post("http://localhost:3001/api/login", {
        username: username,
        password: password
    }).then((response) => {
        if(!response.data.auth){
            alert(response.data.error);
        } else {
            // 発行したtokenをブラウザのlocalStrageのtokenキーに保存する
            localStorage.setItem("token", response.data.token);
            setAuthState(true);
            history.push("/");
        }
    });
  }
  return (
    <div className="App">
        <div className="form">
            <h2>Login</h2>
            <input type="text" value={username} placeholder="Username..." onChange={(e) => {setUsername(e.target.value)}}/>
            <input type="text" value={password} placeholder="Password..." onChange={(e) => {setPassword(e.target.value)}}/>
            <button onClick={login}>Login</button>
        </div>
    </div>
  );
}
