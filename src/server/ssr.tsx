import * as express from "express";
import InfernoServer from "inferno-server";
import {RouterContext, match} from "inferno-router";
import {PopulatedRequest} from "./populatedrequest";
import Main from "../containers/main";
import State from "../containers/state";
import routes from "../routes";

import inferno from "inferno";

declare var __ASSET_URI_BASE__ : string;

export function ssr(req : PopulatedRequest, res : express.Response) {
    const routerProps = match(routes, req.originalUrl);

    res.send(renderBasePage(
        <State initialState={req.initialState}>
            <RouterContext {...routerProps}/>
        </State>,
        req.initialState,
        req.headerMeta
        ));
}

function renderBasePage(
        initial_dom : string,
        initial_state : any,
        headerMeta : string) {

    let asset_base = __ASSET_URI_BASE__;
    let initialStateJson = JSON.stringify(initial_state);
    let escapedJson = initialStateJson.replace(/<\//g, "<\\/");
    let stateScript = `window.__initialState=${escapedJson};`;

    return "<!DOCTYPE html>" + InfernoServer.renderToString(
        <html>
        <head>
            <title>qdb</title>
            <link rel="stylesheet" href={`${asset_base}/qdb.bundle.css`}/>
            <script src="https://use.fontawesome.com/8c6513badd.js"/>
            <script dangerouslySetInnerHTML={{__html: stateScript}}/>
            {headerMeta}
        </head>
        <body>
            <section id="inferno-host">{initial_dom}</section>
            <script src={`${asset_base}/qdb.bundle.js`}></script>
        </body>
        </html>
    );
}
