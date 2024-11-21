import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "./user.css";
import "../dashboard.css";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { User } from "../../Website/context/UserContext";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [accept, setAccept] = useState(false);
  const context = useContext(User);
  const token = context.auth.token;

  const [emailError, setEmailError] = useState(false);
  const nav = useNavigate();

  async function Submit(e) {
    e.preventDefault();

    setAccept(true);

    try {
      let res = await axios.post(
        `http://127.0.0.1:8000/api/user/create`,
        {
          name: name,
          email: email,
          password: password,
          password_confirmation: passwordConfirmation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      nav("/dashboard/users");
    } catch (err) {
      if (err.response.status === 422) {
        setEmailError(true);
      }
      setAccept(true);
    }
  }

  return (
    <div className="all-table">
      <div>
        <div>
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
              <button className="btn" type="submit">
                Create User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
