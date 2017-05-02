import Main from "./components/main";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as api from "./api/api";

let container = document.getElementById("main");
if (container) {
    ReactDOM.render(<Main />, container);
}

let api_handle = new api.QuoteApi();
api_handle.qdbQuoteGet({
    count: 50,
    offset: 0
}).then((quotes) => {
    for (let quote of quotes) {
        console.log(`${quote.author} added on ${quote.addedAt}:\n${quote.body}`);
    }
});
