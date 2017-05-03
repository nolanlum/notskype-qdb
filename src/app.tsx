import Main from "./containers/main";
import Inferno from "inferno";
import * as api from "./api/api";

require("../style/app.scss");

let container = document.getElementById("inferno-host");
if (container) {
    Inferno.render(<Main />, container);
}
