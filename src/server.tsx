import Main from "./containers/main";
import * as express from "express";
import * as proxy from "http-proxy-middleware";
import InfernoServer from "inferno-server";

import {RouterContext, match} from 'inferno-router';
import routes from './routes';

let app = express();
app.use("/api", proxy({
    target: "http://localhost:8080",
    logLevel: "debug"
}));

app.use(express.static("dist"));
app.use(ssrMiddleware);

function ssrMiddleware(req : express.Request, res : express.Response) {
    const routerProps = match(routes, req.originalUrl);
    const initial_dom = InfernoServer.renderToString(
        <RouterContext {...routerProps}/>
    );
    res.send(renderBasePage(initial_dom));
}

function renderBasePage(initial_dom) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>qdb</title>
            <link rel="stylesheet" href="/qdb.bundle.css"/>
        </head>
        <body>
            <section id="inferno-host">${initial_dom}</section>
            <script src="/qdb.bundle.js"></script>
        </body>
        </html>`;
}

app.listen(8000);
