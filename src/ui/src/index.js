import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import AppContainer from "./containers/AppContainer";
import reducers from "./reducers";
import { config } from "react-transition-group";
import account from "./features/account/accountSlice";
import accounts from "./features/account/accountsSlice";
import { configureStore } from "@reduxjs/toolkit";

//const store = createStore(reducers, {}, applyMiddleware(thunk) )
export const store = configureStore({
  reducer: {
    account,
    accounts,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <AppContainer />
    </HashRouter>
  </Provider>,
  document.querySelector("#root")
);
