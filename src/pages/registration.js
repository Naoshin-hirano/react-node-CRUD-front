import React, { useState } from "react";
import '../App.css';
import Axios from "axios";

export const Registration = () => {
  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');
  // axios使ってAPI通信をするとき、 リクエストに Cookie を添えて送信するために withCredentials オプションを有効にする
  Axios.defaults.withCredentials = true;

  const register = () => {
      Axios.post("http://localhost:3001/api/register", {
          username: usernameReg,
          password: passwordReg
      }).then((response) => {
          console.log(response);
      });
  };

  return (
    <div className="App">
        <div className="form">
            <h2>Registration</h2>
            <label>Username</label>
            <input type="text" value={usernameReg} onChange={(e) => {setUsernameReg(e.target.value)}}/>
            <label>Password</label>
            <input type="text" value={passwordReg} onChange={(e) => {setPasswordReg(e.target.value)}}/>
            <button onClick={register}>Register</button>
        </div>
    </div>
  );
}
