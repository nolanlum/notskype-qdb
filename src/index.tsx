import Main from "./components/main";
import * as React from "react";
import * as ReactDOM from "react-dom";

let container = document.getElementById("main");
if (container) {
    ReactDOM.render(<Main />, container);
}
