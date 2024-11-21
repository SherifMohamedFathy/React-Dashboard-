import React, { useContext } from "react";
import axios from "axios";
import { useState } from "react";
import Header from "../../../Components/Header";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { User } from "../context/UserContext";
import Cookies from "universal-cookie";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [accept, setAccept] = useState(false);

  const [Err, setErr] = useState(false);
  const nav = useNavigate();
  const user = useContext(User);
  const cookie = new Cookies();

  console.log(user);

  async function Submit(e) {
    // let flag = true;
    e.preventDefault();

    setAccept(true);

    try {
      let res = await axios.post(`http://127.0.0.1:8000/api/login`, {
        // Fix here

        email: email,
        password: password,
      });

      const token = res.data.data.token;
      cookie.set("Bearer", token);
      const userDetails = res.data.data.user;

      user.setAuth({ token, userDetails });
      nav("/dashboard");
    } catch (err) {
      if (err.response.status === 401) {
        setErr(true);
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
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="emil"
              placeholder="Email..."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password.length < 8 && accept && <p className="error">Password must be more than 8 char</p>}

            <div style={{ textAlign: "center" }}>
              <button type="submit">Login</button>
            </div>
            {accept && Err && <p className="error">Wrong email and password</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
