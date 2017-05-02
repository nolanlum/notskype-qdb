import Main from "./components/main";
import * as express from "express";
import * as proxy from "http-proxy-middleware";
import * as React from "react";
import { renderToString } from "react-dom/server";

let app = express();
app.use(express.static("static"));
app.use("/api", proxy({
    target: "http://localhost:8080",
    logLevel: "debug"
}));

app.use(ssrMiddleware);

function ssrMiddleware(req : express.Request, res : express.Response) {
    let initial_dom = renderToString(<Main />);
    res.send(renderBasePage(initial_dom))
}

function renderBasePage(initial_dom) {
    return `
    <!doctype html>
    <html>
        <body>
            <div id="main">${initial_dom}</div>
        </body>
        <script src="./qdb.bundle.js"></script>
    </html>
    `;
}

app.listen(8000);