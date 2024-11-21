import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { User } from "../context/UserContext";
import Loading from "../../../Components/Loading";
import Cookies from "universal-cookie";

export default function PersistLogin() {
  const [loading, setLoading] = useState(true);
  const context = useContext(User);
  const token = context.auth.token;
  const cookie = new Cookies();
  const getToken = cookie.get("Bearer");
  console.log(cookie);

  useEffect(() => {
    async function refresh() {
      try {
        await axios
          .post(`http://127.0.0.1:8000/api/refresh`, null, {
            headers: {
              Authorization: `Bearer ${getToken}`,
            },
          })
          .then((data) => {
            cookie.set("Bearer", data.data.token);
            context.setAuth((prev) => {
              return {
                userDetails: data.data.user,
                token: data.data.token,
              };
            });
          });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    !token ? refresh() : setLoading(false);
  }, []);

  return loading ? <Loading /> : <Outlet />;
}
