import * as express from "express";
import * as proxy from "http-proxy-middleware";
import * as isomorphicFetch from "isomorphic-fetch";
import sourcemap from "source-map-support";

import {PopulatedRequest} from "./server/populatedrequest";
import classifyQuote from "./lib/classifyquote";
import * as api from "./api/api";

import {ssr} from "./server/ssr";
import * as metadata from "./server/metadata";
import * as state from "./server/state";

sourcemap.install();

let app = express();
console.log("initializing api handle..");
let api_handle = new api.QuoteApi(isomorphicFetch, "http://localhost:8080/api/v1");
app.use("/api", proxy({
    target: "http://localhost:8080/",
    logLevel: "debug"
}));

app.use(state.init);

// metadata pipeline
app.use("/quote/:id", state.quoteId(api_handle));
app.use("/quote/:id", metadata.quoteId(api_handle));
app.get("/quote/:id", ssr);

app.use("/", metadata.root(api_handle));
app.get("/", ssr);

app.use(express.static("dist"));
app.listen(8000, "localhost");
