import Inferno from "inferno";
import {Router} from "inferno-router";
import routes from "./routes";

require("../style/app.scss");

import createBrowserHistory from "history/createBrowserHistory";
export let browserHistory = createBrowserHistory();

let container = document.getElementById("inferno-host");
if (container) {
    Inferno.render(<Router history={browserHistory}>
            {routes}
        </Router>, container);
}
