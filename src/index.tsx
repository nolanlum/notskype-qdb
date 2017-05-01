import Main from "./containers/main";
import Inferno from "inferno";

let container = document.getElementById("inferno-host");
if (container) {
    Inferno.render(<Main />, container);
}
