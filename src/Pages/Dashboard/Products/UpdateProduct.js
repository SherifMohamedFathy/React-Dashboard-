import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import "../dashboard.css";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { User } from "../../Website/context/UserContext";

export default function UpdateProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const [accept, setAccept] = useState(false);

  const context = useContext(User);
  const token = context.auth.token;
  const id = window.location.pathname.split("/").slice(-1)[0];

  const nav = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/product/showbyid/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => {
        setTitle(data.data[0].title);
        setDescription(data.data[0].description);
      })
      .catch((err) => console.log(err));
  }, []);
  async function Submit(e) {
    e.preventDefault();

    setAccept(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", image);
      let res = await axios.post(
        `http://127.0.0.1:8000/api/product/update/${id}`,

        formData,

        {
          headers: {
            Authorization: `Bearer ${token}`,
            // "Content-Type": "multipart/form-data",
          },
        }
      );

      nav("/dashboard/products");
    } catch (err) {
      setAccept(false);
      console.log(err);
    }
  }

  return (
    <div className="all-table">
      <div>
        <div>
          <form onSubmit={Submit}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              placeholder="Title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {title.length < 1 && accept && <p className="error">name must be more than 2 char</p>}
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              placeholder="Description..."
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {/* {accept && emailError && <p className="error">this email has been taken</p>} */}
            <label htmlFor="image">Image:</label>
            <input type="file" id="image" placeholder="Image..." onChange={(e) => setImage(e.target.files[0])} />
            {/* {password.length < 8 && accept && <p className="error">Password must be more than 8 char</p>} */}

            <div style={{ textAlign: "center" }}>
              <button className="btn" type="submit">
                Update Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
