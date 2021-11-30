import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { BrowserRouter } from "react-router-dom";


import App from "./components/app";
import rootReducer from "./reducers";

import "./style/main.scss";


const composeEnhencers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
{/*const createStoreWithMiddleware = applyMiddleware()(createStore);*/}
const store = createStore(
    rootReducer,
    composeEnhencers(applyMiddleware())
   
    
);


function main() {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.querySelector(".app-wrapper")
  );
}

document.addEventListener("DOMContentLoaded", main);
