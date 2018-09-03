import * as express from "express";
import * as requestProxy from "express-request-proxy";
import * as isomorphicFetch from "isomorphic-fetch";
import sourcemap from "source-map-support";
import * as cookieParser from "cookie-parser";

import {PopulatedRequest} from "./server/populatedrequest";
import classifyQuote from "./lib/classifyquote";
import * as api from "./api/api";

import {ssr} from "./server/ssr";
import * as metadata from "./server/metadata";
import * as state from "./server/state";

sourcemap.install();

let app = express();

app.use(cookieParser());

console.log("initializing api handle..");
let api_handle = new api.QuoteApi(isomorphicFetch, "http://localhost:8000/api/v1");
let auth_api_handle = new api.AuthApi(isomorphicFetch, "http://localhost:8000/api/v1");
app.use("/api", (req, res, next) => {
    console.log(req.url, req.cookies.qdbToken ? "has token" : "no token");
    const headers = req.cookies.qdbToken
        ? { "X-Qdb-Token": req.cookies.qdbToken }
        : {};
    const proxy = requestProxy({
        // In middleware, express strips the mount point "/api" from req.path
        url: "http://localhost:8080/api" + req.path,
        headers: headers,
    });
    proxy(req, res, next);
});

app.use(state.init);

// metadata pipeline
app.use("/quote/:id", state.quoteId(api_handle));
app.use("/quote/:id", metadata.quoteId(api_handle));
app.get("/quote/:id", ssr);

app.use("/", metadata.root(api_handle));
app.get("/", ssr);

app.get("/login", (req, res) => {
    let slackCode = req.query.code;
    if (slackCode) {
        auth_api_handle.qdbAuthPost(slackCode)
        .then((response) => response.text())
        .then((token) => {
            res.cookie("qdbToken", token, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)});
            res.redirect(302, "/");
        })
        .catch((err) => {
            console.log("An error decoding the JSON?", err);
            res.send(err);
        });
    }
});

app.use(express.static("dist"));
app.listen(8000, "localhost");
