import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Amplify } from "aws-amplify";
import { store } from "./store";
import { Provider } from "react-redux";
import config from "./aws-exports.ts";
import { BrowserRouter } from "react-router-dom";

Amplify.configure(config);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
