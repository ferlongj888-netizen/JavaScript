import { useState, useEffect } from "react";
import { BASE_API_URL } from "../config";
import "../styles/Register.css";

export default function Register() {
  const [user_info, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (
      user_info.username.length > 0 &&
      user_info.email.length > 0 &&
      user_info.password.length > 0 &&
      user_info.confirmPassword.length > 0 &&
      user_info.password === user_info.confirmPassword
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [
    user_info.username,
    user_info.email,
    user_info.password,
    user_info.confirmPassword,
  ]);

  return (
    <div className="register-container">
      <label htmlFor="register_form">Регистрация</label>
      <input
        className="input"
        value={user_info.username}
        onChange={(ev) => {
          setUserInfo({
            ...user_info,
            username: ev.target.value,
          });
        }}
      ></input>
      <input
        className="input"
        value={user_info.email}
        onChange={(ev) => {
          setUserInfo({
            ...user_info,
            email: ev.target.value,
          });
        }}
      ></input>
      <input
        className="input"
        value={user_info.password}
        onChange={(ev) => {
          setUserInfo({
            ...user_info,
            password: ev.target.value,
          });
        }}
      ></input>
      <input
        className="input"
        value={user_info.confirmPassword}
        onChange={(ev) => {
          setUserInfo({
            ...user_info,
            confirmPassword: ev.target.value,
          });
        }}
      ></input>
      <button
        onClick={() => {
          fetch(BASE_API_URL + "/auth/register", {  (через стор)
            body: JSON.stringify(user_info),
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
        }} 
      >
        Зарегистрироваться
      </button>
    </div>
  );
}
