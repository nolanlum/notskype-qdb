import Inferno from "inferno";
import {Router} from "inferno-router";
import State from "./containers/state";
import routes from "./routes";

require("../style/app.scss");

import createBrowserHistory from "history/createBrowserHistory";
export let browserHistory = createBrowserHistory();

interface AlteredWindow extends Window {
    __initialState : any;
}

let container = document.getElementById("inferno-host");
if (container) {
    Inferno.render(
        <State initialState={(window as AlteredWindow).__initialState}>
            <Router history={browserHistory}>
                {routes}
            </Router>
        </State>,
        container);
}

