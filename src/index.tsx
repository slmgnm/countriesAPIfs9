import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import storeFactory from "./redux/store";


ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeFactory}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

