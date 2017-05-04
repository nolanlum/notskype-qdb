import { Router, Route, IndexRoute } from 'inferno-router';
import Component from "inferno-component";

import ApplicationFrame from "./containers/applicationframe";
import Main from "./containers/main";
import PermalinkQuote from "./containers/permalinkquote";
import Search from "./containers/search";

export default <Route component={ ApplicationFrame }>
                    <IndexRoute component={ Main }/>
                    <Route path="/quote/:id" component={ PermalinkQuote } />
                    <Route path="/search/:query" component={ Search } />
                </Route>
