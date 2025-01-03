import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./core/store/store";
import App from "./core/app/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
 <React.StrictMode>
  <Provider store={store}>
   <Router>
    <App />
   </Router>
  </Provider>
 </React.StrictMode>
);

export default store;
reportWebVitals();
