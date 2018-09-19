import React from "react";
import { render } from "react-dom";
import AppRecursive from "./AppRecursive.js";

const appContainer = document.createElement("div");
document.body.appendChild(appContainer);

render(<AppRecursive/>, appContainer);
