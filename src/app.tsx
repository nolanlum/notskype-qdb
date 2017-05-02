import Main from "./containers/main";
import Inferno from "inferno";
import * as api from "./api/api";

let container = document.getElementById("inferno-host");
if (container) {
    Inferno.render(<Main />, container);
}

// let api_handle = new api.QuoteApi();
// api_handle.qdbQuoteGet({
//     count: 50,
//     offset: 0
// }).then((quotes) => {
//     for (let quote of quotes) {
//         console.log(`${quote.author} added on ${quote.addedAt}:\n${quote.body}`);
//     }
// });
