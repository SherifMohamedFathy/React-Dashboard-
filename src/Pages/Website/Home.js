
import React, { useContext, useEffect, useState } from "react";
import Header from "../../Components/Header";
import axios from "axios";
import { User } from "./context/UserContext";
import "./home.css";

export default function Home() {
  const [products, setProducts] = useState([]); // State for products
  const context = useContext(User);
  const token = context.auth.token; // Token for authorization

  // Fetch products from API
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/product/show", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((data) => setProducts(data.data))
      .catch((err) => console.log(err));
  }, [token]); // Re-run when token changes

  // Map products to display as cards
  const showProductCards = products.map((product, index) => (
    <div key={index} className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-details">
        <h3>{product.title}</h3>
        <p>{product.description}</p>
      </div>
    </div>
  ));

  return (
    <>
      <Header />
      <h1 style={{ textAlign: "center", marginTop: "25px", color: "#163e79", fontWeight: "bold" }}>Our Products</h1>
      <div className="product-grid">{showProductCards}</div>
    </>
  );
}
