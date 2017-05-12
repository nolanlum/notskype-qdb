import Main from "./containers/main";
import * as express from "express";
import * as proxy from "http-proxy-middleware";
import InfernoServer from "inferno-server";
import State from "./containers/state";
import * as isomorphicFetch from "isomorphic-fetch";

import {RouterContext, match} from "inferno-router";
import routes from "./routes";
import * as api from "./api/api";

import sourcemap from "source-map-support";
sourcemap.install();

let app = express();
console.log("initializing api handle..");
let api_handle = new api.QuoteApi(isomorphicFetch, "http://qdb.esports.moe/api/v1");
app.use("/api", proxy({
    target: "http://qdb.esports.moe/",
    logLevel: "debug"
}));

// add initialState prop
interface PopulatedRequest extends express.Request {
    initialState : any;
}

app.use(express.static("dist"));
app.use(function(req : PopulatedRequest, res, next) {
    req.initialState = {
        quotes: {},
    };
    next();
});
app.use("/quote/:id", function(req : PopulatedRequest, res, next) {
    console.log("populating state", api_handle.basePath);
    api_handle.qdbQuoteGetById({ quoteId: req.params.id, })
        .then((quote) => {
            // fetch the quote on the server
            req.initialState.quotes = {[quote.id]: quote};
            next();
        })
        .catch((e) => {
            console.log("state population failed!", e);
            next();
        });
});
app.use("/rand", function(req : PopulatedRequest, res, next) {
    console.log("populating state", api_handle.basePath);
    api_handle.qdbQuoteRand()
        .then((quote) => {
            // fetch the quote on the server
            req.initialState.quotes = {[quote.id]: quote};
            next();
        })
        .catch((e) => {
            console.log("state population failed!", e);
            next();
        });
});

app.use(function ssr(req : PopulatedRequest, res : express.Response) {
    const routerProps = match(routes, req.originalUrl);
    console.log(req.initialState);
    const initial_dom = InfernoServer.renderToString(
        <State initialState={req.initialState}>
            <RouterContext {...routerProps}/>
        </State>
    );
    res.send(renderBasePage(initial_dom, req.initialState));
});

function renderBasePage(initial_dom, initial_state) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>qdb</title>
            <link rel="stylesheet" href="/qdb.bundle.css"/>
            <script src="https://use.fontawesome.com/8c6513badd.js"></script>
            <script>
                window.__initialState=${JSON.stringify(initial_state)};
            </script>
        </head>
        <body>
            <section id="inferno-host">${initial_dom}</section>
            <script src="/qdb.bundle.js"></script>
        </body>
        </html>`;
}

app.listen(8000, "localhost");
