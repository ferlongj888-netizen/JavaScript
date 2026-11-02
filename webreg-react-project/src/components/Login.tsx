import { useState, useEffect } from "react";
import { BASE_API_URL } from "../config";
import "../styles/Login.css";

export default function Login() {
  const [user_info, setUserInfo] = useState({
    login: "",
    password: "",
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (
      user_info.login.length > 0 && 
      user_info.password.length > 0
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [
    user_info.login, 
    user_info.password,
  ]);

  return (
    <div className="login-container">
      <label htmlFor="login_form">Вход</label>
      <input
        className="input"
        value={user_info.login}
        onChange={(ev) => {
          setUserInfo({
            ...user_info,
            login: ev.target.value,
          });
        }}
      />
      <input
        className="input"
        value={user_info.password}
        onChange={(ev) => {
          setUserInfo({
            ...user_info,
            password: ev.target.value,
          });
        }}
      />
      <button
        disabled={!isValid}
        onClick={() => {
          fetch(BASE_API_URL + "/auth/login", {
            body: JSON.stringify({
              login: user_info.login,
              password: user_info.password,
            }),
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
        }}
      >
        Войти
      </button>
    </div>
  );
}