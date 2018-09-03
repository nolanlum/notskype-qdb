import { Route, Switch } from "inferno-router";
import {Component} from "inferno";

import ApplicationFrame from "./containers/applicationframe";
import Main from "./containers/main";
import PermalinkQuote from "./containers/permalinkquote";
import { ErrorPage404 } from "./containers/errorpage";
import Search from "./containers/search";

export default
    <ApplicationFrame>
        <Switch>
            <Route exact path="/" component={ Main } />
            <Route path="/quote/:id" component={ PermalinkQuote } />
            <Route path="/search/:query" component={ Search } />
            <Route path="*" component={ ErrorPage404 } />
        </Switch>
    </ApplicationFrame>;
