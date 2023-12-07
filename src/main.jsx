import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@mui/styles";
import { createTheme } from "@mui/material";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import reducers from "./reducers";
const store = createStore(reducers, compose(applyMiddleware(thunk)));
const theme = createTheme();

ReactDOM.createRoot(document.getElementById("root")).render(
 <React.StrictMode>
  <ThemeProvider theme={theme}>
   <Provider store={store}>
    <App />
   </Provider>
  </ThemeProvider>
 </React.StrictMode>
);
