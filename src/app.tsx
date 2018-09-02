import {render} from "inferno";
import {BrowserRouter} from "inferno-router";
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
    render(
        <State initialState={(window as AlteredWindow).__initialState}>
            <BrowserRouter history={browserHistory}>
                {routes}
            </BrowserRouter>
        </State>,
        container);
}

console.log("initial state: ", (window as AlteredWindow).__initialState);
