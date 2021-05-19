import React from "react";
import ReactDOM from "react-dom";
import "./assets/Style/style.css";
import App from "./App";
import ProductProvider from "./context/context";

ReactDOM.render(
  <ProductProvider>
    <App />
  </ProductProvider>,

  document.getElementById("root")
);
