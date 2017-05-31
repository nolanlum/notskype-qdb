import * as express from "express";
import InfernoServer from "inferno-server";
import {RouterContext, match} from "inferno-router";
import {PopulatedRequest} from "./populatedrequest";
import Main from "../containers/main";
import State from "../containers/state";
import routes from "../routes";

declare var __ASSET_URI_BASE__ : string;

export function ssr(req : PopulatedRequest, res : express.Response) {
    const routerProps = match(routes, req.originalUrl);
    const initial_dom = InfernoServer.renderToString(
        <State initialState={req.initialState}>
            <RouterContext {...routerProps}/>
        </State>
    );

    res.send(renderBasePage(
        initial_dom,
        req.initialState,
        req.headerMeta
        ));
}

function renderBasePage(
        initial_dom : string,
        initial_state : any,
        headerMeta : string) {

    let asset_base = __ASSET_URI_BASE__;

    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>qdb</title>
            <link rel="stylesheet" href="${asset_base}/qdb.bundle.css"/>
            <script src="https://use.fontawesome.com/8c6513badd.js"></script>
            <script>
                window.__initialState=${JSON.stringify(initial_state)};
            </script>
            ${headerMeta}
        </head>
        <body>
            <section id="inferno-host">${initial_dom}</section>
            <script src="${asset_base}/qdb.bundle.js"></script>
        </body>
        </html>`;
}
