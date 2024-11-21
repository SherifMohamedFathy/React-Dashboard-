import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { User } from "../../Website/context/UserContext";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [runUseEffect, setRun] = useState(0);
  const context = useContext(User);
  const token = context.auth.token;
  async function deleteUser(id) {
    try {
      let res = await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setRun((prv) => prv + 1);
      }
    } catch {
      console.log("none");
    }
  }
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/user/show", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => setUsers(data.data))
      .catch((err) => console.log(err));
  }, [runUseEffect]);
  const showUser = users.map((user, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <Link to={`${user.id}`}>
          <i
            className="fa-solid fa-pen-to-square "
            style={{ color: "#74afb9", fontSize: "20px", paddingRight: "10px", cursor: "pointer" }}
          ></i>
        </Link>
        <i
          className="fa-solid fa-trash"
          style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
          onClick={() => deleteUser(user.id)}
        ></i>
      </td>
    </tr>
  ));

  return (
    <div style={{ padding: "20px" }}>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>User</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>{showUser}</tbody>
      </table>
    </div>
  );
}
