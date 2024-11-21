import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./login.css";

import { useNavigate } from "react-router-dom";
import Header from "../../../Components/Header";
import { User } from "../context/UserContext";
import Cookies from "universal-cookie";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [accept, setAccept] = useState(false);
  const cookie = new Cookies();

  const [emailError, setEmailError] = useState(false);
  const nav = useNavigate();
  const user = useContext(User);
  console.log(user);

  async function Submit(e) {
    // let flag = true;
    e.preventDefault();

    setAccept(true);

    try {
      let res = await axios.post(`http://127.0.0.1:8000/api/register`, {
        name: name,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      });

      const token = res.data.data.token;
      cookie.set("Bearer", token);

      const userDetails = res.data.data.user;

      user.setAuth({ token, userDetails });
      nav("/dashboard");
    } catch (err) {
      if (err.response.status === 422) {
        setEmailError(true);
      }
      setAccept(true);
    }
  }

  return (
    <div>
      <Header />
      <div className="parent login">
        <div className="register login">
          <form onSubmit={Submit}>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" placeholder="Name..." value={name} onChange={(e) => setName(e.target.value)} />
            {name.length < 2 && accept && <p className="error">name must be more than 2 char</p>}
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="emil"
              placeholder="Email..."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {accept && emailError && <p className="error">this email has been taken</p>}
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password.length < 8 && accept && <p className="error">Password must be more than 8 char</p>}
            <label htmlFor="passwordCo">Repeat Password:</label>
            <input
              type="password"
              id="passwordCo"
              placeholder="Password..."
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            {passwordConfirmation !== password && accept && <p className="error">password does not match</p>}
            <div style={{ textAlign: "center" }}>
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
