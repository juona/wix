import React from "react";
import { render } from "react-dom";
import App from "./App.js";

const appContainer = document.createElement("div");
document.body.appendChild(appContainer);

render(<App/>, appContainer);
