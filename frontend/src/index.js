import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {Provider} from "react-redux"
import {createStore,applyMiddleware,compose} from "redux";
import thunk from "redux-thunk"
import {reducers} from "./reducer"

const store = createStore(reducers, {}, compose(applyMiddleware(thunk)));

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);  
