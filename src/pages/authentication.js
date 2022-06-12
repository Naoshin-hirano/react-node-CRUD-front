import React, { useEffect, useState } from "react";
import '../App.css';
import Axios from "axios";

export const Authentication = () => {
  const [usernameReg, setUsernameReg] = useState('');
  const [passwordReg, setPasswordReg] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // Userが認証されているか
  const [validation, setValidation] = useState(false);
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

  const login = () => {
    Axios.post("http://localhost:3001/api/login", {
        username: username,
        password: password
    }).then((response) => {
        if(!response.data.auth){
            setValidation(false);
        } else {
            // 発行したtokenをブラウザのlocalStrageのtokenキーに保存する
            localStorage.setItem("token", response.data.token);
            setValidation(true);
        }
    });
  }

  // Userが認証されているかの確認
  const userAuthenticated = () => {
      // headers[x-accress-token]のブラウザのlocalStorageにあるtokenを取得してリクエスト
      Axios.get("http://localhost:3001/api/isUserAuth", {
          headers: {
              "x-access-token": localStorage.getItem("token"),
          },
      }).then((response) => {
          console.log(response);
      });
  };

  // リロードの度にcookieにsessionIdが保持されているかを確認して、保持されていればログイン中のままになる
  useEffect(() => {
      Axios.get("http://localhost:3001/api/login").then((response) => {
          if(response.data.loggedIn === true){
            setValidation(response.data.user[0].username);
          }
      });
  }, []);

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
        <div className="form">
            <h2>Login</h2>
            <input type="text" value={username} placeholder="Username..." onChange={(e) => {setUsername(e.target.value)}}/>
            <input type="text" value={password} placeholder="Password..." onChange={(e) => {setPassword(e.target.value)}}/>
            <button onClick={login}>Login</button>
        </div>
        {validation && (
            <button onClick={userAuthenticated}>Check if Authenticated</button>
        )}
    </div>
  );
}
