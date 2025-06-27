import React, { createContext, useEffect, useState } from "react";
import { getAllProducts } from "../api/productApi";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext(null);

const Userprovider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productLoader, setProductLoader] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductLoader(true);
        const resp = await getAllProducts();
        if (resp.status === 200) {
          setProducts(resp.data.items);
        }
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setProductLoader(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      try {
        const decoded = jwtDecode(savedToken);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          console.warn("Token expired");
          localStorage.removeItem("token");
          setToken("");
        } else {
          setToken(savedToken);
        }
      } catch (err) {
        localStorage.removeItem("token");
        setToken("");
      }
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ products, setProducts, productLoader, setToken, token }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default Userprovider;
